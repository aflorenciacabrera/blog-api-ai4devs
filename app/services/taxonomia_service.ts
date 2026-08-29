import Categoria from '#models/categoria'
import Etiqueta from '#models/etiqueta'

export type TaxonomiaConRecuentoDto = {
  id: number
  nombre: string
  slug: string
  posts: number
}

/** Categorias y etiquetas con su recuento de posts PUBLICADOS (regla 1). */
export default class TaxonomiaService {
  async categorias(): Promise<TaxonomiaConRecuentoDto[]> {
    const categorias = await Categoria.query()
      .withCount('posts', (consulta) => consulta.where('estado', 'publicado'))
      .orderBy('nombre', 'asc')

    return categorias.map((categoria) => ({
      id: categoria.id,
      nombre: categoria.nombre,
      slug: categoria.slug,
      posts: Number(categoria.$extras.posts_count ?? 0),
    }))
  }

  async etiquetas(): Promise<TaxonomiaConRecuentoDto[]> {
    const etiquetas = await Etiqueta.query()
      .withCount('posts', (consulta) => consulta.where('posts.estado', 'publicado'))
      .orderBy('nombre', 'asc')

    return etiquetas.map((etiqueta) => ({
      id: etiqueta.id,
      nombre: etiqueta.nombre,
      slug: etiqueta.slug,
      posts: Number(etiqueta.$extras.posts_count ?? 0),
    }))
  }
}
