import { Controller, Body, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { ZodPipe } from 'src/core/pipes/zod-pipe'
import { loginRequestSchema } from '@lib/schema'
import { ApiTags } from '@nestjs/swagger'
import { LoginRequestDto } from './dto/login-request'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Body(new ZodPipe(loginRequestSchema))
    loginRequest: LoginRequestDto,
  ) {
    return await this.authService.login(loginRequest)
  }
}
