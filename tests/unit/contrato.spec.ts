import { test } from '@japa/runner'
import ContratoService from '#services/contrato_service'

/**
 * El contrato fijado sirve de algo solo si de verdad rechaza una respuesta que no encaja.
 * Este test fija ese comportamiento sin necesidad de tener blog-ai levantado.
 */
test.group('Contrato fijado con blog-ai', () => {
  const contrato = new ContratoService()

  test('acepta una respuesta que cumple el contrato', async ({ assert }) => {
    const problemas = await contrato.validarContra('RespuestaBuscar', {
      consulta: 'modo oscuro',
      resultados: [
        {
          post_id: 4,
          slug: 'las-dos-caras-del-diseno-de-interfaz-oscuro',
          titulo: 'Las dos caras del diseño de interfaz oscuro',
          resumen: 'Un resumen',
          puntuacion: 0.71,
          fragmento: 'Un fragmento',
        },
      ],
    })
    assert.deepEqual(problemas, [])
  })

  test('detecta el campo renombrado que blog-ai podria introducir sin avisar', async ({
    assert,
  }) => {
    const problemas = await contrato.validarContra('RespuestaBuscar', {
      consulta: 'modo oscuro',
      resultados: [
        {
          post_id: 4,
          slug: 'las-dos-caras-del-diseno-de-interfaz-oscuro',
          titulo: 'Las dos caras del diseño de interfaz oscuro',
          resumen: 'Un resumen',
          // «puntuacion» se llama ahora «score» al otro lado del limite.
          score: 0.71,
          fragmento: 'Un fragmento',
        },
      ],
    })
    assert.lengthOf(problemas, 1)
    assert.include(problemas[0], 'puntuacion')
  })

  test('detecta un tipo que cambia', async ({ assert }) => {
    const problemas = await contrato.validarContra('RespuestaPreguntar', {
      consulta: 'modo oscuro',
      respuesta: 'Una respuesta',
      fuentes: [],
      modelo: 42,
    })
    assert.lengthOf(problemas, 1)
    assert.include(problemas[0], 'modelo')
  })

  test('el esquema pedido tiene que existir en el contrato', async ({ assert }) => {
    const problemas = await contrato.validarContra('EsquemaInventado', {})
    assert.include(problemas[0], 'no define el esquema')
  })
})
