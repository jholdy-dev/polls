import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserDto } from '../users/dto/user.dto'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super()
  }

  async validate(
    username: string,
    password: string,
  ): Promise<Omit<UserDto, 'password'>> {
    const user = await this.authService.validateUser(username, password)

    if (!user) {
      throw new UnauthorizedException('Invalid user credentials')
    }
    return user
  }
}
