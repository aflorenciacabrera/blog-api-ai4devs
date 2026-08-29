import type { HttpContext } from '@adonisjs/core/http'
import AutorService from '#services/autor_service'

export default class AutoresController {
  constructor(private autores: AutorService = new AutorService()) {}

  async show({ params, response }: HttpContext) {
    const autor = await this.autores.detalle(Number(params.id))
    if (!autor) {
      return response.notFound({ error: 'Autor no encontrado' })
    }
    return { datos: autor }
  }
}
