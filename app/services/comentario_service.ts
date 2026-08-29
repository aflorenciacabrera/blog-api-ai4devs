import Comentario from '#models/comentario'
import Post from '#models/post'

export type NuevoComentario = {
  autor_nombre: string
  autor_email: string
  cuerpo: string
  padre_id?: number | null
}

export type ResultadoAltaComentario =
  | { estado: 'creado'; id: number }
  | { estado: 'post_no_encontrado' }
  | { estado: 'padre_invalido'; motivo: string }

export default class ComentarioService {
  /**
   * Todo comentario nace `pendiente` y no se muestra hasta que alguien lo aprueba (regla 2).
   * El anidamiento es de UN nivel: no se puede responder a una respuesta.
   */
  async crear(slug: string, datos: NuevoComentario): Promise<ResultadoAltaComentario> {
    const post = await Post.query().where('slug', slug).where('estado', 'publicado').first()
    if (!post) {
      return { estado: 'post_no_encontrado' }
    }

    if (datos.padre_id) {
      const padre = await Comentario.find(datos.padre_id)
      if (!padre || padre.postId !== post.id) {
        return { estado: 'padre_invalido', motivo: 'El comentario padre no pertenece a este post' }
      }
      if (padre.padreId !== null) {
        return {
          estado: 'padre_invalido',
          motivo: 'Las respuestas anidadas son de un solo nivel',
        }
      }
    }

    const comentario = await Comentario.create({
      postId: post.id,
      autorNombre: datos.autor_nombre,
      autorEmail: datos.autor_email,
      cuerpo: datos.cuerpo,
      estado: 'pendiente',
      padreId: datos.padre_id ?? null,
    })

    return { estado: 'creado', id: comentario.id }
  }
}
