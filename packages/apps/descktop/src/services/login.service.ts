import { LoginRequest, User } from '@lib/schema'
import { HttpService } from './api'

export interface LoginResponse {
  token: string
  user: Omit<User, 'password'>
}

class LoginService {
  constructor(private readonly httpService: HttpService) {}
  async login(loginDto: LoginRequest): Promise<LoginResponse> {
    const response = await this.httpService.post<LoginResponse>(
      '/auth/login',
      loginDto,
    )
    return response
  }
}

export const loginService = new LoginService(new HttpService())
