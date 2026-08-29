import vine from '@vinejs/vine'

/** Parametros de `GET /posts`. Todo es opcional y todo tiene tope. */
export const listadoDePostsValidator = vine.compile(
  vine.object({
    pagina: vine.number().min(1).optional(),
    por_pagina: vine.number().min(1).max(50).optional(),
    categoria: vine.string().trim().maxLength(120).optional(),
    etiqueta: vine.string().trim().maxLength(120).optional(),
    autor: vine.number().min(1).optional(),
    q: vine.string().trim().minLength(2).maxLength(120).optional(),
  })
)

export const limiteValidator = vine.compile(
  vine.object({
    limite: vine.number().min(1).max(20).optional(),
  })
)
