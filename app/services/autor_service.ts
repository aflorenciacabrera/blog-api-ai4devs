import Autor from '#models/autor'
import PostService from '#services/post_service'
import { aAutorPublico } from '#transformers/autor_transformer'
import type { AutorPublicoDto } from '#transformers/autor_transformer'
import type { PostResumenDto } from '#transformers/post_transformer'

export type AutorConPostsDto = AutorPublicoDto & { posts: PostResumenDto[] }

export default class AutorService {
  constructor(private postService: PostService = new PostService()) {}

  async detalle(id: number): Promise<AutorConPostsDto | null> {
    const autor = await Autor.find(id)
    if (!autor) {
      return null
    }

    // Regla 1: tampoco en la ficha de su autor aparece un borrador.
    const listado = await this.postService.listar({ pagina: 1, porPagina: 50, autor: autor.id })

    return { ...aAutorPublico(autor), posts: listado.datos }
  }
}
