import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'comentarios'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('post_id').unsigned().references('id').inTable('posts').onDelete('CASCADE')
      table.string('autor_nombre').notNullable()
      // Igual que el correo del autor: se guarda, no se publica (regla 6).
      table.string('autor_email').notNullable()
      table.text('cuerpo').notNullable()
      table.enum('estado', ['pendiente', 'aprobado']).notNullable().defaultTo('pendiente')
      table.timestamp('creado_en').notNullable()
      // Respuestas anidadas de un solo nivel: un hijo nunca puede tener hijos.
      table
        .integer('padre_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('comentarios')
        .onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
