import type { HttpContext } from '@adonisjs/core/http'
import BlogAiService from '#services/blog_ai_service'
import PostService from '#services/post_service'
import { consultaValidator } from '#validators/busqueda_validator'

/**
 * Las dos rutas que cruzan el limite entre repositorios. blog-api no sabe de embeddings:
 * delega en blog-ai y vuelve a montar la tarjeta de cada resultado con SUS datos,
 * que son la fuente de verdad del blog.
 */
export default class BusquedaController {
  constructor(
    private ia: BlogAiService = new BlogAiService(),
    private posts: PostService = new PostService()
  ) {}

  async buscar({ request }: HttpContext) {
    const { consulta, limite } = await request.validateUsing(consultaValidator)
    const respuesta = await this.ia.buscar(consulta, limite ?? 5)

    // Un resultado que blog-ai devuelva y aqui ya no sea publico se cae en este paso.
    const tarjetas = await this.posts.porSlugs(respuesta.resultados.map((r) => r.slug))

    return {
      datos: {
        consulta: respuesta.consulta,
        resultados: respuesta.resultados.map((resultado) => ({
          ...resultado,
          post: tarjetas.get(resultado.slug) ?? null,
        })),
      },
    }
  }

  async preguntar({ request }: HttpContext) {
    const { consulta, limite } = await request.validateUsing(consultaValidator)
    const respuesta = await this.ia.preguntar(consulta, limite ?? 3)
    return { datos: respuesta }
  }

  /**
   * Empuja a blog-ai los posts publicados. Es una operacion de mantenimiento:
   * en un sistema real la dispararia un evento de publicacion.
   */
  async indexar({}: HttpContext) {
    const posts = await this.posts.paraIndexar()
    const resultado = await this.ia.indexar(posts)
    return { datos: { enviados: posts.length, ...resultado } }
  }

  /** Cuantos fragmentos hay indexados en blog-ai. Delega, no cuenta nada aqui. */
  async resumenIndice({}: HttpContext) {
    // contract-ready
    const resumen = await this.ia.resumenIndice()
    return { datos: resumen }
  }

  /** Ping de contrato: confirma que blog-ai responde. Delega, no hace nada mas. */
  async pingContrato({}: HttpContext) {
    // contract-ready
    const respuesta = await this.ia.pingContrato()
    return { datos: respuesta }
  }

  /** Eco de sesion: confirma que blog-ai responde. Delega, no hace nada mas. */
  async ecoSesion({}: HttpContext) {
    // contract-ready
    const respuesta = await this.ia.ecoSesion()
    return { datos: respuesta }
  }

  /** Latido: confirma que blog-ai responde. Delega, no hace nada mas. */
  async latido({}: HttpContext) {
    // contract-ready
    const respuesta = await this.ia.latido()
    return { datos: respuesta }
  }
}
