import Factory from '@ioc:Adonis/Lucid/Factory'
import Brand from 'App/Models/Brand'
import Category from 'App/Models/Category'
import Product from 'App/Models/Product'
import ProductImage from 'App/Models/ProductImage'
import ProductItem from 'App/Models/ProductItem'

export const BrandFactory = Factory.define(Brand, ({ faker }) => ({
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  country_of_origin: faker.address.country(),
  manufacturer_name: faker.company.companyName(),
})).build()

export const CategoryFactory = Factory.define(Category, ({ faker }) => ({
  title: faker.unique(faker.commerce.department),
  slug: faker.unique(faker.lorem.slug),
  description: faker.lorem.paragraph(),
}))
  .relation('subCategories', () => CategoryFactory)
  .build()

export const ProductImageFactory = Factory.define(ProductImage, ({ faker }) => ({
  filename: `${faker.image.food()}?${faker.datatype.uuid()}`,
  role: faker.random.arrayElement(['primary', 'secondary']),
})).build()

export const ProductFactory = Factory.define(Product, ({ faker }) => ({
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  alcoholContent: faker.datatype.number(),
}))
  .relation('brand', () => BrandFactory)
  .relation('categories', () => CategoryFactory)
  .relation('images', () => ProductImageFactory)
  .relation('items', () => ProductItemFactory)
  .build()

export const ProductItemFactory = Factory.define(ProductItem, ({ faker }) => ({
  stockKeepingUnit: faker.datatype.uuid(),
  maximumRetailPrice: faker.datatype.number({ min: 0, max: 500 }),
  price: faker.datatype.number({ min: 0, max: 500 }),
  sold: faker.datatype.number({ min: 0, max: 250 }),
  defective: faker.datatype.number({ min: 0, max: 250 }),
  quantity: faker.datatype.number({ min: 500, max: 1000 }),
}))
  .relation('product', () => ProductFactory)
  .build()
