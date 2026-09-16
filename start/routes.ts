/*
|--------------------------------------------------------------------------
| Rutas de blog-api
|--------------------------------------------------------------------------
|
| Rutas finas: cada una apunta a un metodo de controlador y no contiene logica.
| El orden importa en /posts/recientes, que tiene que declararse ANTES de
| /posts/:slug para que «recientes» no se lea como un slug.
|
*/

import router from '@adonisjs/core/services/router'

const PostsController = () => import('#controllers/posts_controller')
const TaxonomiasController = () => import('#controllers/taxonomias_controller')
const AutoresController = () => import('#controllers/autores_controller')
const ComentariosController = () => import('#controllers/comentarios_controller')
const BusquedaController = () => import('#controllers/busqueda_controller')
const SaludController = () => import('#controllers/salud_controller')

router.get('/', async () => ({
  servicio: 'blog-api',
  blog: 'Corriente',
  documentacion: '/salud',
}))

router.get('/salud', [SaludController, 'index'])
router.get('/contrato', [SaludController, 'verificarContrato'])

router.get('/posts/recientes', [PostsController, 'recientes'])
router.get('/posts', [PostsController, 'index'])
router.get('/posts/:slug', [PostsController, 'show'])
router.get('/posts/:slug/relacionados', [PostsController, 'relacionados'])
router.post('/posts/:slug/comentarios', [ComentariosController, 'store'])

router.get('/categorias', [TaxonomiasController, 'categorias'])
router.get('/etiquetas', [TaxonomiasController, 'etiquetas'])
router.get('/autores/:id', [AutoresController, 'show'])

// Las dos que cruzan el limite de servicio: blog-api delega en blog-ai.
router.post('/buscar', [BusquedaController, 'buscar'])
router.post('/preguntar', [BusquedaController, 'preguntar'])
router.post('/indexar', [BusquedaController, 'indexar'])
router.get('/resumen-indice', [BusquedaController, 'resumenIndice'])
router.get('/ping-contrato', [BusquedaController, 'pingContrato'])
router.get('/eco-sesion', [BusquedaController, 'ecoSesion'])
router.get('/latido', [BusquedaController, 'latido'])
