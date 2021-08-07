import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { CategoryFactory } from 'Database/factories'

export default class CategorySeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    await CategoryFactory.createMany(5)
  }
}
