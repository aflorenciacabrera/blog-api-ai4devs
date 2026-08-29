import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Post from '#models/post'

export default class Etiqueta extends BaseModel {
  static table = 'etiquetas'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombre: string

  @column()
  declare slug: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => Post, {
    pivotTable: 'etiqueta_post',
    pivotForeignKey: 'etiqueta_id',
    pivotRelatedForeignKey: 'post_id',
  })
  declare posts: ManyToMany<typeof Post>
}
