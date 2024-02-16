import { UserDto } from './user.dto'

export interface GetUsersReponseDto {
  data: UserDto[]
  page: number
  totalCount: number
}
