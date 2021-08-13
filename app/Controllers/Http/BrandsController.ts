import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import { schema } from '@ioc:Adonis/Core/Validator'
import Brand from 'App/Models/Brand'
import CreateBrandValidator from 'App/Validators/CreateBrandValidator'
import QueryWrapper, {
  appendOrderBy,
  appendPaginate,
  appendPreload,
  appendSerialize,
  appendWhere,
} from 'App/Utils/QueryWrapper'

export default class BrandsController {
  public async index({
    paginationParams,
    sortingParams,
    fieldsParams,
    attachParams,
    searchParams,
  }: HttpContextContract) {
    return new QueryWrapper<ModelQueryBuilderContract<typeof Brand>>(Brand.query())
      .map(appendWhere, searchParams)
      .map(appendOrderBy, sortingParams)
      .map(appendPreload, attachParams)
      .map(appendPaginate, paginationParams)
      .map(appendSerialize, fieldsParams)
      .fold()
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateBrandValidator)
    response.status(201)
    return await Brand.create(payload)
  }

  public async show({ params, fieldsParams, attachParams }: HttpContextContract) {
    return new QueryWrapper<ModelQueryBuilderContract<typeof Brand>>(
      Brand.query().where('id', params.id)
    )
      .map(appendPreload, attachParams)
      .map(appendSerialize, fieldsParams)
      .fold()
      .firstOrFail()
  }

  public async update({ params, request }: HttpContextContract) {
    const updateSchema = schema.create({
      name: schema.string.optional({ trim: true }),
      description: schema.string.optional({ trim: true, escape: true }),
      country_of_origin: schema.string.optional({ trim: true }),
      manufacturer_name: schema.string.optional({ trim: true }),
    })
    const payload = await request.validate({ schema: updateSchema })

    return await (await Brand.findOrFail(params.id)).merge(payload).save()
  }

  public async destroy({ params }: HttpContextContract) {
    const brand = await Brand.findOrFail(params.id)
    await brand.delete()

    return brand
  }
}
