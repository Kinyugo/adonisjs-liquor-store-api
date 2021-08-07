import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { ProductFactory } from 'Database/factories'

export default class ProductSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    await ProductFactory.with('brand')
      .with('categories', 1, (category) => category.with('subCategories', 2))
      .with('images', 5)
      .with('items', 5)
      .createMany(5)
  }
}
