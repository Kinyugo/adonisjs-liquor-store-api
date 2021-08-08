import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, computed } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'

export default class ProductItem extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public productId: number

  @column()
  public stockKeepingUnit: string

  @column()
  public maximumRetailPrice: number

  @column()
  public price: number

  @column()
  public sold: number

  @column()
  public defective: number

  @column()
  public quantity: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @computed()
  public get available() {
    return this.quantity - (this.defective + this.sold)
  }

  @computed()
  public get discount() {
    return this.maximumRetailPrice - this.price
  }

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>
}
