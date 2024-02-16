import { User } from '@lib/schema'
import { HttpService } from './api'
import { ListService } from '../components'

type GetUsersResponse = {
  data: User[]
  page: number
  totalCount: number
}

class UserService implements Omit<ListService<User>, 'answerQuiz'> {
  constructor(private readonly httpService: HttpService) {}
  async update(id: number, data: User): Promise<User> {
    const result = await this.httpService.patch<User>(`/users/${id}`, data)
    return result
  }
  async delete(id: string): Promise<User> {
    const result = await this.httpService.delete<User>(`/users/${id}`)
    return result
  }
  async create(user: User): Promise<User> {
    const response = await this.httpService.post<User>('/users', user)
    return response
  }
  async get(page = 1, limit = 10): Promise<GetUsersResponse> {
    const response = await this.httpService.get<GetUsersResponse>(
      `/users?page=${page}&limit=${limit}`,
    )
    return response
  }
}

export const userService = new UserService(new HttpService())
