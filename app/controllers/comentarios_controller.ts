import type { HttpContext } from '@adonisjs/core/http'
import ComentarioService from '#services/comentario_service'
import { nuevoComentarioValidator } from '#validators/comentario_validator'

export default class ComentariosController {
  constructor(private comentarios: ComentarioService = new ComentarioService()) {}

  async store({ params, request, response }: HttpContext) {
    const datos = await request.validateUsing(nuevoComentarioValidator)
    const resultado = await this.comentarios.crear(params.slug, datos)

    if (resultado.estado === 'post_no_encontrado') {
      return response.notFound({ error: 'Post no encontrado' })
    }

    if (resultado.estado === 'padre_invalido') {
      return response.unprocessableEntity({ error: resultado.motivo })
    }

    return response.created({
      datos: {
        id: resultado.id,
        estado: 'pendiente',
        mensaje: 'Tu comentario queda pendiente de aprobacion',
      },
    })
  }
}
