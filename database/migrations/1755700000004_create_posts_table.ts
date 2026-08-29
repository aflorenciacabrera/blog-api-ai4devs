import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('titulo').notNullable()
      // Regla 3: el slug es unico entre posts. Lo garantiza la base de datos, no solo el codigo.
      table.string('slug').notNullable().unique()
      table.text('resumen').notNullable()
      table.text('cuerpo').notNullable()
      table.string('imagen_portada').notNullable()
      table.enum('estado', ['borrador', 'publicado']).notNullable().defaultTo('borrador')
      table.timestamp('publicado_en').nullable()
      table.integer('autor_id').unsigned().references('id').inTable('autores').onDelete('CASCADE')
      table
        .integer('categoria_id')
        .unsigned()
        .references('id')
        .inTable('categorias')
        .onDelete('CASCADE')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
