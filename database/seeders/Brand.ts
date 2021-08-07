import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { BrandFactory } from 'Database/factories'

export default class BrandSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    await BrandFactory.createMany(5)
  }
}
