import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Post from '#models/post'

/** Redes sociales del autor, tal y como las pinta la caja de biografia. */
export type Redes = {
  youtube?: string
  facebook?: string
  instagram?: string
  x?: string
  linkedin?: string
}

export default class Autor extends BaseModel {
  static table = 'autores'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombre: string

  /**
   * Dato interno. Ningun transformer de salida lo copia: la regla 6 del dominio
   * dice que la respuesta publica no expone correos.
   */
  @column()
  declare email: string

  @column()
  declare rol: string

  @column()
  declare bio: string

  @column()
  declare avatar: string

  @column({
    prepare: (valor: Redes) => JSON.stringify(valor ?? {}),
    consume: (valor: string | null) => (valor ? (JSON.parse(valor) as Redes) : {}),
  })
  declare redes: Redes

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Post, { foreignKey: 'autorId' })
  declare posts: HasMany<typeof Post>
}
