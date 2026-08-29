import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Autor from '#models/autor'
import Categoria from '#models/categoria'
import Etiqueta from '#models/etiqueta'
import Comentario from '#models/comentario'

export type EstadoPost = 'borrador' | 'publicado'

export default class Post extends BaseModel {
  static table = 'posts'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare titulo: string

  @column()
  declare slug: string

  @column()
  declare resumen: string

  /** Markdown con secciones y pies de imagen. */
  @column()
  declare cuerpo: string

  @column()
  declare imagenPortada: string

  @column()
  declare estado: EstadoPost

  @column.dateTime()
  declare publicadoEn: DateTime | null

  @column()
  declare autorId: number

  @column()
  declare categoriaId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Autor, { foreignKey: 'autorId' })
  declare autor: BelongsTo<typeof Autor>

  @belongsTo(() => Categoria, { foreignKey: 'categoriaId' })
  declare categoria: BelongsTo<typeof Categoria>

  @manyToMany(() => Etiqueta, {
    pivotTable: 'etiqueta_post',
    pivotForeignKey: 'post_id',
    pivotRelatedForeignKey: 'etiqueta_id',
  })
  declare etiquetas: ManyToMany<typeof Etiqueta>

  @hasMany(() => Comentario, { foreignKey: 'postId' })
  declare comentarios: HasMany<typeof Comentario>
}
