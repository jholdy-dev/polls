import { User } from '@lib/schema'
import { HttpService } from './api'

class UserService {
  constructor(private readonly httpService: HttpService) {}
  async create(user: User): Promise<User> {
    const response = await this.httpService.post<User>('/users', user)
    return response
  }
}

export const userService = new UserService(new HttpService())
