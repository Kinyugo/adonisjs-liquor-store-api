import { BaseModel, ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'

export default class QueryWrapper<T> {
  private query: T

  constructor(query: T) {
    this.query = query
  }

  public map(mapperFn: (q: T, p: any) => any, params: any) {
    params && mapperFn(this.query, params)
    return new QueryWrapper(this.query)
  }

  public fold() {
    return this.query
  }
}

export const appendWhere = (
  query: ModelQueryBuilderContract<typeof BaseModel>,
  params: SearchParams
) => params.forEach(([column, searchQuery]) => query.where(column, 'LIKE', `%${searchQuery}%`))

export const appendOrderBy = (
  query: ModelQueryBuilderContract<typeof BaseModel>,
  params: SortingParams
) => query.orderBy(params)

export const appendPreload = (
  query: ModelQueryBuilderContract<typeof BaseModel>,
  params: AttachParams
) => params.forEach((p: any) => query.preload(p))

export const appendPaginate = (
  query: ModelQueryBuilderContract<typeof BaseModel>,
  params: PaginationParams
) => {
  query.paginate(params.page, params.perPage)
}

export const appendSerialize = async (
  query: ModelQueryBuilderContract<typeof BaseModel>,
  params: FieldsParams
) => (await query).map((b) => b.serialize({ fields: { pick: params } }))
