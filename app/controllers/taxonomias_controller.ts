import type { HttpContext } from '@adonisjs/core/http'
import TaxonomiaService from '#services/taxonomia_service'

export default class TaxonomiasController {
  constructor(private taxonomias: TaxonomiaService = new TaxonomiaService()) {}

  async categorias({}: HttpContext) {
    return { datos: await this.taxonomias.categorias() }
  }

  async etiquetas({}: HttpContext) {
    return { datos: await this.taxonomias.etiquetas() }
  }
}
