import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Post from '#models/post'

export type EstadoComentario = 'pendiente' | 'aprobado'

export default class Comentario extends BaseModel {
  static table = 'comentarios'

  // Ojo: la tabla no lleva created_at/updated_at. El dominio pide "creado_en".

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare postId: number

  @column()
  declare autorNombre: string

  /** Dato interno: nunca sale en la respuesta publica (regla 6). */
  @column()
  declare autorEmail: string

  @column()
  declare cuerpo: string

  @column()
  declare estado: EstadoComentario

  @column.dateTime({ autoCreate: true })
  declare creadoEn: DateTime

  @column()
  declare padreId: number | null

  @belongsTo(() => Post, { foreignKey: 'postId' })
  declare post: BelongsTo<typeof Post>

  @belongsTo(() => Comentario, { foreignKey: 'padreId' })
  declare padre: BelongsTo<typeof Comentario>

  @hasMany(() => Comentario, { foreignKey: 'padreId' })
  declare respuestas: HasMany<typeof Comentario>
}
