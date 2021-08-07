import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  ManyToMany,
  manyToMany,
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

  @hasMany(() => ProductImage)
  public images: HasMany<typeof ProductImage>

  @manyToMany(() => Category)
  public categories: ManyToMany<typeof Category>

  @hasMany(() => ProductItem)
  public items: HasMany<typeof ProductItem>
}
