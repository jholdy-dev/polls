import { Controller, Body, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { ZodPipe } from 'src/core/pipes/zod-pipe'
import { loginRequestSchema, LoginRequest } from '@lib/schema'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Body(new ZodPipe(loginRequestSchema))
    loginRequest: LoginRequest,
  ) {
    return await this.authService.login(loginRequest)
  }
}
