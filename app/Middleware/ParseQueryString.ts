import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'

export default class ParseQueryString {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    this.parsePaginationQuery(ctx)
    this.parseSortQuery(ctx)
    this.parseFieldsQuery(ctx)
    this.parseAttachQuery(ctx)
    this.parseSearchQuery(ctx)

    await next()
  }

  private parsePaginationQuery(ctx: HttpContextContract) {
    const { request } = ctx
    const page = request.input('page', 1)
    const perPage = Number(request.input('per_page', Env.get('RESULTS_PER_PAGE')))
    const pagination = { page, perPage }
    ctx.paginationParams = pagination
  }

  private parseSortQuery(ctx: HttpContextContract) {
    const { request } = ctx
    const sortQuery = request.input('sort', '') as string
    if (sortQuery) {
      ctx.sortingParams = sortQuery.split(',').map((q) => {
        const [column, order] = q.split(':').map((s) => s.trim())
        return { column, order: order as Order }
      })
    }
  }

  private parseFieldsQuery(ctx: HttpContextContract) {
    const { request } = ctx
    ctx.fieldsParams = this.queryToArray(request.input('fields', ''))
  }

  private parseAttachQuery(ctx: HttpContextContract) {
    const { request } = ctx
    ctx.attachParams = this.queryToArray(request.input('attach', null)) || null
  }

  private parseSearchQuery(ctx: HttpContextContract) {
    const { request } = ctx
    const searchQuery = request.input('search', null)
    ctx.searchParams = searchQuery ? this.queryToStringPairs(searchQuery) : null
  }

  private queryToArray(query: string | null) {
    return query ? query.split(',').map((q) => q.trim()) : []
  }

  private queryToStringPairs(query: string) {
    return query.split(',').map((q) => q.split(':').map((s) => s.trim()))
  }
}
