import vine from '@vinejs/vine'

/** Cuerpo de `POST /buscar` y `POST /preguntar`, antes de delegar en blog-ai. */
export const consultaValidator = vine.compile(
  vine.object({
    consulta: vine.string().trim().minLength(3).maxLength(300),
    limite: vine.number().min(1).max(10).optional(),
  })
)
