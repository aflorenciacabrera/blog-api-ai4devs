import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import app from '@adonisjs/core/services/app'
import env from '#start/env'

type EsquemaOpenApi = {
  type?: string
  required?: string[]
  properties?: Record<string, EsquemaOpenApi>
  items?: EsquemaOpenApi
  anyOf?: EsquemaOpenApi[]
  $ref?: string
}

type DocumentoOpenApi = {
  info?: { title?: string; version?: string }
  paths?: Record<string, Record<string, unknown>>
  components?: { schemas?: Record<string, EsquemaOpenApi> }
}

export type Diferencia = {
  tipo: 'operacion' | 'esquema' | 'campo'
  donde: string
  detalle: string
}

export type Comparacion = {
  coincide: boolean
  huella_fijada: string
  huella_viva: string | null
  version_fijada: string | null
  version_viva: string | null
  diferencias: Diferencia[]
  error?: string
}

/**
 * El contrato con blog-ai vive en este repositorio como ARTEFACTO VERSIONADO
 * (`contracts/blog-ai.openapi.json`), no como conocimiento repartido por el codigo.
 *
 * Este servicio hace dos cosas con esa copia fijada:
 *
 *   1. Comparar (`comparar`): descarga el OpenAPI vivo de blog-ai y dice, operacion
 *      a operacion y campo a campo, en que se han separado. Es lo que ejecuta
 *      `node ace contrato:verificar`, y es el sitio donde una deriva se ve ANTES
 *      de llegar a un usuario.
 *
 *   2. Validar (`validarContra`): comprobar en caliente que lo que blog-ai acaba de
 *      responder encaja con la copia fijada. Sin esto, un campo renombrado al otro
 *      lado no da error: se propaga como `undefined` hasta la interfaz.
 */
export default class ContratoService {
  private static cache: { documento: DocumentoOpenApi; huella: string } | null = null

  static get rutaDelContrato() {
    return app.makePath('contracts/blog-ai.openapi.json')
  }

  /** Huella estable del documento: JSON con las claves ordenadas, en sha256. */
  static huellaDe(documento: unknown): string {
    return createHash('sha256').update(this.canonico(documento)).digest('hex')
  }

  private static canonico(valor: unknown): string {
    if (Array.isArray(valor)) {
      return `[${valor.map((elemento) => this.canonico(elemento)).join(',')}]`
    }
    if (valor && typeof valor === 'object') {
      const objeto = valor as Record<string, unknown>
      const claves = Object.keys(objeto).sort()
      return `{${claves.map((clave) => `${JSON.stringify(clave)}:${this.canonico(objeto[clave])}`).join(',')}}`
    }
    return JSON.stringify(valor ?? null)
  }

  async fijado(): Promise<{ documento: DocumentoOpenApi; huella: string }> {
    if (ContratoService.cache) {
      return ContratoService.cache
    }
    const crudo = await readFile(ContratoService.rutaDelContrato, 'utf-8')
    const documento = JSON.parse(crudo) as DocumentoOpenApi
    ContratoService.cache = { documento, huella: ContratoService.huellaDe(documento) }
    return ContratoService.cache
  }

  private resolver(documento: DocumentoOpenApi, esquema: EsquemaOpenApi): EsquemaOpenApi {
    if (esquema.$ref) {
      const nombre = esquema.$ref.split('/').pop()!
      return documento.components?.schemas?.[nombre] ?? {}
    }
    return esquema
  }

  /**
   * Comprueba un cuerpo de respuesta contra un esquema del contrato fijado.
   * Solo mira presencia de campos obligatorios y tipos escalares: es suficiente para
   * cazar un renombrado o un campo que desaparece, que es como se rompen estos limites.
   */
  async validarContra(nombreDelEsquema: string, cuerpo: unknown): Promise<string[]> {
    const { documento } = await this.fijado()
    const esquema = documento.components?.schemas?.[nombreDelEsquema]
    if (!esquema) {
      return [`El contrato fijado no define el esquema "${nombreDelEsquema}"`]
    }
    return this.problemas(documento, esquema, cuerpo, nombreDelEsquema, 0)
  }

  private problemas(
    documento: DocumentoOpenApi,
    esquema: EsquemaOpenApi,
    valor: unknown,
    ruta: string,
    profundidad: number
  ): string[] {
    if (profundidad > 4) {
      return []
    }

    const encontrados: string[] = []

    if (esquema.properties) {
      if (typeof valor !== 'object' || valor === null || Array.isArray(valor)) {
        return [`${ruta}: se esperaba un objeto y llego ${Array.isArray(valor) ? 'una lista' : typeof valor}`]
      }
      const objeto = valor as Record<string, unknown>

      for (const obligatorio of esquema.required ?? []) {
        if (!(obligatorio in objeto)) {
          encontrados.push(`${ruta}.${obligatorio}: falta un campo obligatorio del contrato`)
        }
      }

      for (const [nombre, propiedad] of Object.entries(esquema.properties)) {
        if (!(nombre in objeto)) {
          continue
        }
        const resuelta = this.resolver(documento, propiedad)
        if (resuelta.type === 'array' && resuelta.items) {
          const items = objeto[nombre]
          if (!Array.isArray(items)) {
            encontrados.push(`${ruta}.${nombre}: se esperaba una lista`)
            continue
          }
          const esquemaItem = this.resolver(documento, resuelta.items)
          items.forEach((item, indice) => {
            encontrados.push(
              ...this.problemas(
                documento,
                esquemaItem,
                item,
                `${ruta}.${nombre}[${indice}]`,
                profundidad + 1
              )
            )
          })
        } else if (resuelta.properties) {
          encontrados.push(
            ...this.problemas(
              documento,
              resuelta,
              objeto[nombre],
              `${ruta}.${nombre}`,
              profundidad + 1
            )
          )
        } else if (resuelta.type && objeto[nombre] !== null) {
          const esperado = resuelta.type
          const recibido = typeof objeto[nombre]
          const encaja =
            (esperado === 'string' && recibido === 'string') ||
            ((esperado === 'number' || esperado === 'integer') && recibido === 'number') ||
            (esperado === 'boolean' && recibido === 'boolean') ||
            (esperado === 'object' && recibido === 'object')
          if (!encaja) {
            encontrados.push(
              `${ruta}.${nombre}: el contrato dice ${esperado} y llego ${recibido}`
            )
          }
        }
      }
    }

    return encontrados
  }

  /** Descarga el OpenAPI vivo de blog-ai y lo compara con la copia fijada. */
  async comparar(): Promise<Comparacion> {
    const { documento: fijado, huella } = await this.fijado()
    const base: Comparacion = {
      coincide: false,
      huella_fijada: huella,
      huella_viva: null,
      version_fijada: fijado.info?.version ?? null,
      version_viva: null,
      diferencias: [],
    }

    let vivo: DocumentoOpenApi
    try {
      const respuesta = await fetch(`${env.get('BLOG_AI_URL')}/openapi.json`, {
        signal: AbortSignal.timeout(10_000),
      })
      if (!respuesta.ok) {
        return { ...base, error: `blog-ai respondio ${respuesta.status} al pedir su OpenAPI` }
      }
      vivo = (await respuesta.json()) as DocumentoOpenApi
    } catch (error) {
      return { ...base, error: `No se pudo hablar con blog-ai: ${(error as Error).message}` }
    }

    const huellaViva = ContratoService.huellaDe(vivo)
    const diferencias: Diferencia[] = []

    // 1. Operaciones: rutas y metodos que estan en uno y no en el otro.
    const operaciones = (documento: DocumentoOpenApi) => {
      const lista = new Set<string>()
      for (const [ruta, metodos] of Object.entries(documento.paths ?? {})) {
        for (const metodo of Object.keys(metodos)) {
          lista.add(`${metodo.toUpperCase()} ${ruta}`)
        }
      }
      return lista
    }

    const fijadas = operaciones(fijado)
    const vivas = operaciones(vivo)

    for (const operacion of fijadas) {
      if (!vivas.has(operacion)) {
        diferencias.push({
          tipo: 'operacion',
          donde: operacion,
          detalle: 'esta en el contrato fijado y ya no existe en blog-ai',
        })
      }
    }
    for (const operacion of vivas) {
      if (!fijadas.has(operacion)) {
        diferencias.push({
          tipo: 'operacion',
          donde: operacion,
          detalle: 'blog-ai la ofrece y el contrato fijado no la conoce',
        })
      }
    }

    // 2. Esquemas: campos obligatorios y propiedades de cada modelo.
    const esquemasFijados = fijado.components?.schemas ?? {}
    const esquemasVivos = vivo.components?.schemas ?? {}

    for (const [nombre, esquema] of Object.entries(esquemasFijados)) {
      const gemelo = esquemasVivos[nombre]
      if (!gemelo) {
        diferencias.push({
          tipo: 'esquema',
          donde: nombre,
          detalle: 'desaparecio del OpenAPI de blog-ai',
        })
        continue
      }

      const propiedadesFijadas = Object.keys(esquema.properties ?? {})
      const propiedadesVivas = Object.keys(gemelo.properties ?? {})

      for (const propiedad of propiedadesFijadas) {
        if (!propiedadesVivas.includes(propiedad)) {
          diferencias.push({
            tipo: 'campo',
            donde: `${nombre}.${propiedad}`,
            detalle: 'el contrato fijado lo espera y blog-ai ya no lo devuelve',
          })
        }
      }
      for (const propiedad of propiedadesVivas) {
        if (!propiedadesFijadas.includes(propiedad)) {
          diferencias.push({
            tipo: 'campo',
            donde: `${nombre}.${propiedad}`,
            detalle: 'blog-ai lo devuelve y el contrato fijado no lo conoce',
          })
        }
      }

      const obligatoriosFijados = (esquema.required ?? []).join(',')
      const obligatoriosVivos = (gemelo.required ?? []).join(',')
      if (obligatoriosFijados !== obligatoriosVivos) {
        diferencias.push({
          tipo: 'esquema',
          donde: nombre,
          detalle: `campos obligatorios: fijado [${obligatoriosFijados}] vs vivo [${obligatoriosVivos}]`,
        })
      }
    }

    for (const nombre of Object.keys(esquemasVivos)) {
      if (!esquemasFijados[nombre]) {
        diferencias.push({
          tipo: 'esquema',
          donde: nombre,
          detalle: 'esquema nuevo en blog-ai, ausente del contrato fijado',
        })
      }
    }

    return {
      coincide: diferencias.length === 0,
      huella_fijada: huella,
      huella_viva: huellaViva,
      version_fijada: fijado.info?.version ?? null,
      version_viva: vivo.info?.version ?? null,
      diferencias,
    }
  }
}
