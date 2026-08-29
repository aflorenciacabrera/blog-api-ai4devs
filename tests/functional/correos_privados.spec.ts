import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { autores, comentarios } from '../../database/datos_semilla.js'

/**
 * Regla 6 del dominio: la respuesta publica no expone el correo del autor ni el de
 * quien comenta.
 *
 * El test no busca el nombre de un campo: busca los CORREOS DE LA SEMILLA en el cuerpo
 * crudo de la respuesta. Asi sigue fallando aunque alguien los publique bajo otra clave,
 * los anide dentro de otro objeto o cambie el transformer por un `serialize()`.
 */
test.group('Regla 6 — los correos no salen de la base de datos', (group) => {
  group.each.setup(() => testUtils.db().migrate())
  group.each.setup(() => testUtils.db().seed())

  const correosDeLaSemilla = [
    ...autores.map((autor) => autor.email),
    ...comentarios.map((comentario) => comentario.autorEmail),
  ]

  const rutasPublicas = [
    '/posts',
    '/posts/recientes',
    '/posts/diez-tendencias-de-diseno-que-pueden-cambiar-la-web-moderna',
    '/posts/diez-tendencias-de-diseno-que-pueden-cambiar-la-web-moderna/relacionados',
    '/autores/1',
    '/categorias',
    '/etiquetas',
  ]

  for (const ruta of rutasPublicas) {
    test(`GET ${ruta} no devuelve ningun correo`, async ({ client, assert }) => {
      const respuesta = await client.get(ruta)
      respuesta.assertStatus(200)

      const cuerpo = JSON.stringify(respuesta.body())
      for (const correo of correosDeLaSemilla) {
        assert.notInclude(cuerpo, correo, `${ruta} filtro el correo ${correo}`)
      }
      assert.notInclude(cuerpo, '"email"')
      assert.notInclude(cuerpo, 'autor_email')
    })
  }

  test('el correo se guarda al comentar, pero no vuelve en la respuesta', async ({
    client,
    assert,
  }) => {
    const respuesta = await client
      .post('/posts/diez-tendencias-de-diseno-que-pueden-cambiar-la-web-moderna/comentarios')
      .json({
        autor_nombre: 'Persona que comenta',
        autor_email: 'correo.muy.identificable@ejemplo.es',
        cuerpo: 'Un comentario cualquiera para la prueba.',
      })

    respuesta.assertStatus(201)
    assert.notInclude(JSON.stringify(respuesta.body()), 'correo.muy.identificable@ejemplo.es')

    const detalle = await client.get(
      '/posts/diez-tendencias-de-diseno-que-pueden-cambiar-la-web-moderna'
    )
    assert.notInclude(JSON.stringify(detalle.body()), 'correo.muy.identificable@ejemplo.es')
  })
})
