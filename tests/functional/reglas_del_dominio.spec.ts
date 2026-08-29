import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

const POST_CON_COMENTARIOS = 'diez-tendencias-de-diseno-que-pueden-cambiar-la-web-moderna'
const BORRADOR = 'guia-de-accesibilidad-para-equipos-pequenos'

test.group('Reglas de negocio del blog', (group) => {
  group.each.setup(() => testUtils.db().migrate())
  group.each.setup(() => testUtils.db().seed())

  test('regla 1 — un borrador no aparece en el listado', async ({ client, assert }) => {
    const respuesta = await client.get('/posts?por_pagina=50')
    respuesta.assertStatus(200)
    const slugs = respuesta.body().datos.map((post: { slug: string }) => post.slug)
    assert.lengthOf(slugs, 8)
    assert.notInclude(slugs, BORRADOR)
  })

  test('regla 1 — un borrador responde 404, igual que un slug inexistente', async ({ client }) => {
    await client.get(`/posts/${BORRADOR}`).then((r) => r.assertStatus(404))
    await client.get('/posts/este-slug-no-existe').then((r) => r.assertStatus(404))
  })

  test('regla 1 — un borrador tampoco sale en recientes ni en la ficha de su autor', async ({
    client,
    assert,
  }) => {
    const recientes = await client.get('/posts/recientes?limite=20')
    assert.notInclude(
      recientes.body().datos.map((post: { slug: string }) => post.slug),
      BORRADOR
    )

    // El borrador «Guia de accesibilidad» es de la autora 3.
    const autora = await client.get('/autores/3')
    assert.notInclude(
      autora.body().datos.posts.map((post: { slug: string }) => post.slug),
      BORRADOR
    )
  })

  test('regla 2 — un comentario pendiente no se muestra', async ({ client, assert }) => {
    const respuesta = await client.get(`/posts/${POST_CON_COMENTARIOS}`)
    const cuerpo = JSON.stringify(respuesta.body())
    assert.notInclude(cuerpo, 'enlaces-baratos')
    assert.notInclude(cuerpo, 'Comercial SEO')
  })

  test('regla 5 — el recuento cuenta solo los comentarios aprobados', async ({
    client,
    assert,
  }) => {
    const respuesta = await client.get(`/posts/${POST_CON_COMENTARIOS}`)
    // El post tiene 4 comentarios en la base de datos: 3 aprobados y 1 pendiente.
    assert.equal(respuesta.body().datos.comentarios, 3)
    assert.lengthOf(respuesta.body().datos.comentarios_lista, 2)
    assert.lengthOf(respuesta.body().datos.comentarios_lista[0].respuestas, 1)
  })

  test('regla 4 — los relacionados no incluyen el propio post y respetan el tope', async ({
    client,
    assert,
  }) => {
    const respuesta = await client.get(`/posts/${POST_CON_COMENTARIOS}/relacionados?limite=3`)
    const slugs = respuesta.body().datos.map((post: { slug: string }) => post.slug)
    assert.notInclude(slugs, POST_CON_COMENTARIOS)
    assert.isAtMost(slugs.length, 3)
  })

  test('un comentario nuevo nace pendiente', async ({ client, assert }) => {
    const antes = await client.get(`/posts/${POST_CON_COMENTARIOS}`)

    const alta = await client.post(`/posts/${POST_CON_COMENTARIOS}/comentarios`).json({
      autor_nombre: 'Alguien',
      autor_email: 'alguien@ejemplo.es',
      cuerpo: 'Comentario recien llegado.',
    })
    alta.assertStatus(201)
    assert.equal(alta.body().datos.estado, 'pendiente')

    const despues = await client.get(`/posts/${POST_CON_COMENTARIOS}`)
    assert.equal(despues.body().datos.comentarios, antes.body().datos.comentarios)
  })

  test('las respuestas anidadas son de un solo nivel', async ({ client }) => {
    const respuesta = await client.post(`/posts/${POST_CON_COMENTARIOS}/comentarios`).json({
      autor_nombre: 'Alguien',
      autor_email: 'alguien@ejemplo.es',
      // El comentario 2 ya es una respuesta del comentario 1.
      padre_id: 2,
      cuerpo: 'Respuesta de una respuesta.',
    })
    respuesta.assertStatus(422)
  })

  test('los filtros del listado funcionan', async ({ client, assert }) => {
    const porCategoria = await client.get('/posts?categoria=inspiracion')
    assert.lengthOf(porCategoria.body().datos, 2)

    const porEtiqueta = await client.get('/posts?etiqueta=portafolios')
    assert.lengthOf(porEtiqueta.body().datos, 1)

    const porTexto = await client.get('/posts?q=tipografia')
    assert.isAtLeast(porTexto.body().datos.length, 1)
  })
})
