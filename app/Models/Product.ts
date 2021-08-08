import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeFetch,
  beforeFind,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  ManyToMany,
  manyToMany,
  ModelQueryBuilderContract,
} from '@ioc:Adonis/Lucid/Orm'
import ProductImage from './ProductImage'
import Brand from './Brand'
import Category from './Category'
import ProductItem from './ProductItem'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public brandId: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public alcoholContent: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Brand)
  public brand: BelongsTo<typeof Brand>

  @hasMany(() => ProductImage, { serializeAs: 'product_items' })
  public productImages: HasMany<typeof ProductImage>

  @manyToMany(() => Category)
  public categories: ManyToMany<typeof Category>

  @hasMany(() => ProductItem, { serializeAs: 'product_items' })
  public productItems: HasMany<typeof ProductItem>

  @beforeFetch()
  @beforeFind()
  public static fetchCategories(query: ModelQueryBuilderContract<typeof Product>) {
    query.preload('categories', (categoryQuery) => {
      categoryQuery
        .preload('subCategories', (subCategoryQuery) => subCategoryQuery.select('title', 'slug'))
        .select('title', 'slug')
    })
  }
}
