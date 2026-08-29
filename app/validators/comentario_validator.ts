import vine from '@vinejs/vine'

/**
 * Alta de comentario. El correo es obligatorio y se guarda,
 * pero no vuelve en ninguna respuesta publica (regla 6).
 */
export const nuevoComentarioValidator = vine.compile(
  vine.object({
    autor_nombre: vine.string().trim().minLength(2).maxLength(80),
    autor_email: vine.string().trim().email().maxLength(160),
    cuerpo: vine.string().trim().minLength(5).maxLength(2000),
    padre_id: vine.number().min(1).optional(),
  })
)
