import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public parentId: number

  @column()
  public title: string

  @column()
  @slugify({ strategy: 'dbIncrement', fields: ['title'], allowUpdates: true })
  public slug: string

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Category, {
    foreignKey: 'parentId',
    serializeAs: 'sub_categories',
  })
  public subCategories: HasMany<typeof Category>
}
