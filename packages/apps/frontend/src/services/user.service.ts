import { User } from '@lib/schema'
import { HttpService } from './api'

class UserService {
  constructor(private readonly httpService: HttpService) {}
  async create(user: User): Promise<User> {
    const response = await this.httpService.post<User>('/users', user)
    return response
  }
  async get(page = 1, limit = 10): Promise<User[]> {
    const response = await this.httpService.get<User[]>(
      `/users?page=${page}&limit=${limit}`,
    )
    return response
  }
}

export const userService = new UserService(new HttpService())
