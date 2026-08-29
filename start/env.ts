/*
|--------------------------------------------------------------------------
| Environment variables service
|--------------------------------------------------------------------------
|
| El servicio Env valida las variables de entorno al arrancar. Si falta una,
| la aplicacion no levanta: mejor un fallo ruidoso que un `undefined` en produccion.
|
*/

import { Env } from '@adonisjs/core/env'

export default await Env.create(new URL('../', import.meta.url), {
  NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),
  PORT: Env.schema.number(),
  APP_KEY: Env.schema.string(),
  HOST: Env.schema.string({ format: 'host' }),
  LOG_LEVEL: Env.schema.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']),

  /*
  |--------------------------------------------------------------------------
  | El otro repositorio
  |--------------------------------------------------------------------------
  */
  // Donde vive blog-ai. Es la unica dependencia de red de este servicio.
  BLOG_AI_URL: Env.schema.string(),
  // Milisegundos antes de rendirse con blog-ai.
  BLOG_AI_TIMEOUT_MS: Env.schema.number.optional(),
  /*
   * Si es `true`, blog-api rechaza con 502 cualquier respuesta de blog-ai que no
   * encaje con el contrato fijado en `contracts/blog-ai.openapi.json`.
   * Si es `false`, la deja pasar tal cual: el hueco viaja hasta el cliente sin
   * que nada lo senale.
   */
  CONTRATO_ESTRICTO: Env.schema.boolean.optional(),
})
