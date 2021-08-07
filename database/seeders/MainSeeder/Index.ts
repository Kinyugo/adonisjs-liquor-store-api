import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Application from '@ioc:Adonis/Core/Application'

export default class IndexSeeder extends BaseSeeder {
  public async runSeeder(seeder: { default: typeof BaseSeeder }) {
    seeder.default.developmentOnly && !Application.inDev
      ? null
      : await new seeder.default(this.client).run()
  }

  public async run() {
    await this.runSeeder(await import('../Product'))
  }
}
