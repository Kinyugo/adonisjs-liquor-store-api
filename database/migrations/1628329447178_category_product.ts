import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CategoryProduct extends BaseSchema {
  protected tableName = 'category_product'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('product_id')
        .unsigned()
        .references('products.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('category_id')
        .unsigned()
        .references('categories.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.unique(['product_id', 'category_id'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
