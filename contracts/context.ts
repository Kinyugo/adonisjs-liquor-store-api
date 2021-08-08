type Order = 'asc' | 'desc' | undefined
type SortingParam = { column: string; order: 'asc' | 'desc' | undefined }

declare module '@ioc:Adonis/Core/HttpContext' {
  interface HttpContextContract {
    paginationParams: { page: number; perPage: number } | null
    sortingParams: SortingParam[] | null
    fieldsParams: string[] | []
    attachParams: string[] | null
    searchParams: string[][] | null
  }
}
