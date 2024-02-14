import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginRequest, loginRequestSchema } from '@lib/schema'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ZodPipe } from 'src/core/pipes/zod-pipe'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        cpf: {
          type: 'string',
          description: 'The CPF of the user',
          example: '00000000000',
        },
        password: {
          type: 'string',
          description: 'The password of the user',
          example: 'password1234@',
        },
      },
    },
  })
  @Post('login')
  signIn(@Body(new ZodPipe(loginRequestSchema)) signInDto: LoginRequest) {
    return this.authService.login(signInDto)
  }
}
