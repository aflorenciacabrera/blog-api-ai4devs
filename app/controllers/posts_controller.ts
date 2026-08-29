import type { HttpContext } from '@adonisjs/core/http'
import PostService from '#services/post_service'
import { limiteValidator, listadoDePostsValidator } from '#validators/post_validator'

/**
 * El controlador solo traduce HTTP: valida la entrada, llama al servicio y elige
 * el codigo de estado. No conoce la base de datos ni monta respuestas a mano.
 */
export default class PostsController {
  constructor(private posts: PostService = new PostService()) {}

  async index({ request }: HttpContext) {
    const filtros = await request.validateUsing(listadoDePostsValidator, { data: request.qs() })

    return this.posts.listar({
      pagina: filtros.pagina ?? 1,
      porPagina: filtros.por_pagina ?? 6,
      categoria: filtros.categoria,
      etiqueta: filtros.etiqueta,
      autor: filtros.autor,
      q: filtros.q,
    })
  }

  async recientes({ request }: HttpContext) {
    const { limite } = await request.validateUsing(limiteValidator, { data: request.qs() })
    return { datos: await this.posts.recientes(limite ?? 5) }
  }

  async show({ params, response }: HttpContext) {
    const post = await this.posts.detalle(params.slug)
    if (!post) {
      // Un borrador responde 404 igual que un slug inexistente: no se filtra ni su existencia.
      return response.notFound({ error: 'Post no encontrado' })
    }
    return { datos: post }
  }

  async relacionados({ params, request, response }: HttpContext) {
    const { limite } = await request.validateUsing(limiteValidator, { data: request.qs() })
    const relacionados = await this.posts.relacionados(params.slug, limite ?? 2)
    if (relacionados === null) {
      return response.notFound({ error: 'Post no encontrado' })
    }
    return { datos: relacionados }
  }
}
