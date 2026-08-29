import type { HttpContext } from '@adonisjs/core/http'
import BlogAiService from '#services/blog_ai_service'
import ContratoService from '#services/contrato_service'

export default class SaludController {
  constructor(
    private ia: BlogAiService = new BlogAiService(),
    private contrato: ContratoService = new ContratoService()
  ) {}

  /** Estado de este servicio y del vecino del que depende. */
  async index({}: HttpContext) {
    const { huella, documento } = await this.contrato.fijado()
    return {
      estado: 'ok',
      servicio: 'blog-api',
      blog_ai: await this.ia.salud(),
      contrato: {
        archivo: 'contracts/blog-ai.openapi.json',
        version_fijada: documento.info?.version ?? null,
        huella: huella.slice(0, 16),
      },
    }
  }

  /** Compara la copia fijada del contrato con el OpenAPI vivo de blog-ai. */
  async verificarContrato({ response }: HttpContext) {
    const comparacion = await this.contrato.comparar()
    if (comparacion.error) {
      return response.status(502).send(comparacion)
    }
    return response.status(comparacion.coincide ? 200 : 409).send(comparacion)
  }
}
