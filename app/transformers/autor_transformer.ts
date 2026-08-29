import Autor, { type Redes } from '#models/autor'

/** Autor tal y como lo pinta la tarjeta de un post: sin bio y sin redes. */
export type AutorResumenDto = {
  id: number
  nombre: string
  rol: string
  avatar: string
}

/** Autor tal y como lo pinta la caja de biografia del detalle. */
export type AutorPublicoDto = AutorResumenDto & {
  bio: string
  redes: Redes
}

/**
 * Regla 6 del dominio: la respuesta publica no expone el correo del autor.
 *
 * Se cumple aqui, en un unico sitio, construyendo el objeto de salida campo a campo.
 * Si en su lugar se serializara el modelo entero (`post.serialize()`), cualquier columna
 * nueva de la tabla se publicaria sola.
 */
export function aAutorResumen(autor: Autor): AutorResumenDto {
  return {
    id: autor.id,
    nombre: autor.nombre,
    rol: autor.rol,
    avatar: autor.avatar,
  }
}

export function aAutorPublico(autor: Autor): AutorPublicoDto {
  return {
    ...aAutorResumen(autor),
    bio: autor.bio,
    redes: autor.redes ?? {},
  }
}
