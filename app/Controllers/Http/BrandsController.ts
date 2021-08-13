import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ExtractModelRelations } from '@ioc:Adonis/Lucid/Orm'
import { schema } from '@ioc:Adonis/Core/Validator'
import Brand from 'App/Models/Brand'
import CreateBrandValidator from 'App/Validators/CreateBrandValidator'

export default class BrandsController {
  public async index({
    paginationParams,
    sortingParams,
    fieldsParams,
    attachParams,
    searchParams,
  }: HttpContextContract) {
    const brands = Brand.query()
    searchParams &&
      searchParams.forEach(([column, searchQuery]) =>
        brands.where(column, 'LIKE', `%${searchQuery}%`)
      )
    sortingParams && brands.orderBy(sortingParams)
    attachParams &&
      attachParams.forEach((attach) => brands.preload(attach as ExtractModelRelations<Brand>))
    brands.paginate(paginationParams!.page, paginationParams!.perPage)
    fieldsParams &&
      (await brands).map((brand) => brand.serialize({ fields: { pick: fieldsParams } }))

    return brands
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateBrandValidator)
    response.status(201)
    return await Brand.create(payload)
  }

  public async show({ params, fieldsParams, attachParams }: HttpContextContract) {
    const brand = Brand.query().where('id', params.id)
    attachParams!.forEach((attach) => brand.preload(attach as ExtractModelRelations<Brand>))
    return fieldsParams
      ? (await brand.firstOrFail()).serialize({ fields: { pick: fieldsParams } })
      : brand
  }

  public async update({ params, request }: HttpContextContract) {
    const brand = await Brand.findOrFail(params.id)
    const updateSchema = schema.create({
      name: schema.string.optional({ trim: true }),
      description: schema.string.optional({ trim: true, escape: true }),
      country_of_origin: schema.string.optional({ trim: true }),
      manufacturer_name: schema.string.optional({ trim: true }),
    })
    const payload = await request.validate({ schema: updateSchema })

    return await brand.merge(payload).save()
  }

  public async destroy({ params }: HttpContextContract) {
    const brand = await Brand.findOrFail(params.id)
    await brand.delete()

    return brand
  }
}
