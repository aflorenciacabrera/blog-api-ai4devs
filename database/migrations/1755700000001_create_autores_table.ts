import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'autores'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('nombre').notNullable()
      // El correo vive en la base de datos, pero NUNCA sale en una respuesta publica (regla 6).
      table.string('email').notNullable().unique()
      table.string('rol').notNullable()
      table.text('bio').notNullable()
      table.string('avatar').notNullable()
      // Redes sociales como JSON: youtube, facebook, instagram, x, linkedin.
      table.text('redes').notNullable().defaultTo('{}')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
