import Post from '#models/post'
import { aAutorPublico, aAutorResumen } from '#transformers/autor_transformer'
import type { AutorPublicoDto, AutorResumenDto } from '#transformers/autor_transformer'
import { aArbolDeComentarios } from '#transformers/comentario_transformer'
import type { ComentarioDto } from '#transformers/comentario_transformer'

export type TaxonomiaDto = { id: number; nombre: string; slug: string }

export type PostResumenDto = {
  id: number
  titulo: string
  slug: string
  resumen: string
  imagen_portada: string
  publicado_en: string | null
  autor: AutorResumenDto
  categoria: TaxonomiaDto
  etiquetas: TaxonomiaDto[]
  comentarios: number
}

export type VecinoDto = { titulo: string; slug: string } | null

export type PostDetalleDto = Omit<PostResumenDto, 'autor'> & {
  cuerpo: string
  autor: AutorPublicoDto
  comentarios_lista: ComentarioDto[]
  anterior: VecinoDto
  siguiente: VecinoDto
}

function aTaxonomia(entidad: { id: number; nombre: string; slug: string }): TaxonomiaDto {
  return { id: entidad.id, nombre: entidad.nombre, slug: entidad.slug }
}

/**
 * Tarjeta de post. El recuento de comentarios llega calculado desde el servicio
 * y cuenta SOLO los aprobados (regla 5).
 */
export function aPostResumen(post: Post, comentariosAprobados: number): PostResumenDto {
  return {
    id: post.id,
    titulo: post.titulo,
    slug: post.slug,
    resumen: post.resumen,
    imagen_portada: post.imagenPortada,
    publicado_en: post.publicadoEn?.toISO() ?? null,
    autor: aAutorResumen(post.autor),
    categoria: aTaxonomia(post.categoria),
    etiquetas: post.etiquetas.map(aTaxonomia),
    comentarios: comentariosAprobados,
  }
}

export function aPostDetalle(
  post: Post,
  comentariosAprobados: Parameters<typeof aArbolDeComentarios>[0],
  vecinos: { anterior: VecinoDto; siguiente: VecinoDto }
): PostDetalleDto {
  const arbol = aArbolDeComentarios(comentariosAprobados)
  return {
    ...aPostResumen(post, comentariosAprobados.length),
    autor: aAutorPublico(post.autor),
    cuerpo: post.cuerpo,
    comentarios_lista: arbol,
    anterior: vecinos.anterior,
    siguiente: vecinos.siguiente,
  }
}
