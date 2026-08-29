import { DateTime } from 'luxon'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'
import Autor from '#models/autor'
import Categoria from '#models/categoria'
import Etiqueta from '#models/etiqueta'
import Post from '#models/post'
import Comentario from '#models/comentario'
import { autores, categorias, comentarios, etiquetas, posts } from '../datos_semilla.js'

/**
 * Siembra el blog «Corriente» con la semilla compartida del dominio.
 * Es idempotente: vacia las tablas antes de escribir.
 */
export default class extends BaseSeeder {
  async run() {
    await db.from('etiqueta_post').delete()
    await db.from('comentarios').delete()
    await db.from('posts').delete()
    await db.from('etiquetas').delete()
    await db.from('categorias').delete()
    await db.from('autores').delete()

    await Autor.createMany(autores)
    await Categoria.createMany(categorias)
    await Etiqueta.createMany(etiquetas)

    for (const semilla of posts) {
      const { etiquetas: etiquetasDelPost, publicadoEn, ...campos } = semilla
      const post = await Post.create({
        ...campos,
        publicadoEn: publicadoEn ? DateTime.fromISO(publicadoEn) : null,
      })
      await post.related('etiquetas').attach(etiquetasDelPost)
    }

    // Los comentarios se insertan en orden de id para que un hijo encuentre a su padre.
    for (const semilla of comentarios) {
      await Comentario.create({
        ...semilla,
        creadoEn: DateTime.fromISO(semilla.creadoEn),
      })
    }
  }
}
