import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'etiqueta_post'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('post_id').unsigned().references('id').inTable('posts').onDelete('CASCADE')
      table
        .integer('etiqueta_id')
        .unsigned()
        .references('id')
        .inTable('etiquetas')
        .onDelete('CASCADE')
      table.unique(['post_id', 'etiqueta_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
