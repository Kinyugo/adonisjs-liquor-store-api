type Order = 'asc' | 'desc' | undefined
type PaginationParams = { page: number; perPage: number }
type SortingParams = { column: string; order: 'asc' | 'desc' | undefined }[]
type FieldsParams = string[]
type AttachParams = string[]
type SearchParams = string[][]

declare module '@ioc:Adonis/Core/HttpContext' {
  interface HttpContextContract {
    paginationParams: PaginationParams | null
    sortingParams: SortingParams | null
    fieldsParams: FieldsParams | []
    attachParams: AttachParams | null
    searchParams: SearchParams | null
  }
}
