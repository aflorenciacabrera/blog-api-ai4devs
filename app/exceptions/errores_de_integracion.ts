import { Exception } from '@adonisjs/core/exceptions'
import type { HttpContext } from '@adonisjs/core/http'

/** blog-ai no contesta, tarda demasiado o devuelve un error propio. */
export class ServicioIaCaido extends Exception {
  static status = 502
  static code = 'E_BLOG_AI_CAIDO'

  async handle(error: this, ctx: HttpContext) {
    return ctx.response.status(502).send({
      error: ServicioIaCaido.code,
      mensaje: error.message,
      pista: 'Levanta blog-ai (puerto 8402) o revisa BLOG_AI_URL en el .env de blog-api.',
    })
  }
}

/**
 * blog-ai contesto, pero lo que devolvio no encaja con el contrato fijado en
 * `contracts/blog-ai.openapi.json`. Este es el error que hace RUIDOSA una deriva
 * de contrato en vez de dejar que se propague como `undefined`.
 */
export class ContratoIncumplido extends Exception {
  static status = 502
  static code = 'E_CONTRATO_INCUMPLIDO'

  constructor(
    public problemas: string[],
    public esquema: string
  ) {
    super(`La respuesta de blog-ai no cumple el contrato fijado (${esquema})`)
  }

  async handle(error: this, ctx: HttpContext) {
    return ctx.response.status(502).send({
      error: ContratoIncumplido.code,
      mensaje: error.message,
      esquema: error.esquema,
      problemas: error.problemas,
      pista:
        'El contrato fijado esta en contracts/blog-ai.openapi.json. ' +
        'Ejecuta `node ace contrato:verificar` para ver en que se han separado.',
    })
  }
}
