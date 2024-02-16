export interface GenericResponse<T> {
  data: T
}

export interface GenericWithPaginationResponse<T> {
  data: T[]
  page: number
  totalCount: number
}

export interface ReturnSuccess {
  message: string
}
