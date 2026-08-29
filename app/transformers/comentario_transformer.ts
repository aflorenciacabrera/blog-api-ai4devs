import Comentario from '#models/comentario'

export type ComentarioDto = {
  id: number
  autor_nombre: string
  cuerpo: string
  creado_en: string | null
  respuestas: ComentarioDto[]
}

/**
 * Regla 6: tampoco sale el correo de quien comenta.
 * Regla 2: quien llama a este transformer ya ha filtrado los pendientes.
 */
export function aComentario(comentario: Comentario, respuestas: Comentario[] = []): ComentarioDto {
  return {
    id: comentario.id,
    autor_nombre: comentario.autorNombre,
    cuerpo: comentario.cuerpo,
    creado_en: comentario.creadoEn?.toISO() ?? null,
    respuestas: respuestas.map((respuesta) => aComentario(respuesta)),
  }
}

/**
 * Monta el arbol de un solo nivel que pide el dominio: raices en orden cronologico
 * y, colgando de cada una, sus respuestas.
 */
export function aArbolDeComentarios(comentarios: Comentario[]): ComentarioDto[] {
  const raices = comentarios.filter((comentario) => comentario.padreId === null)
  return raices.map((raiz) =>
    aComentario(
      raiz,
      comentarios.filter((comentario) => comentario.padreId === raiz.id)
    )
  )
}
