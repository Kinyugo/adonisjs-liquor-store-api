import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProductItems extends BaseSchema {
  protected tableName = 'product_items'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('product_id')
        .unsigned()
        .references('products.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.string('stock_keeping_unit').unique().notNullable()
      table.decimal('maximum_retail_price').unsigned().notNullable()
      table.decimal('price').unsigned().notNullable()
      table.integer('sold').unsigned().defaultTo(0)
      table.integer('defective').unsigned().defaultTo(0)
      table.integer('quantity').unsigned().notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
