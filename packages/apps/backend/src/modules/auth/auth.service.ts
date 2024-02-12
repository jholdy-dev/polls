import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { UserDto } from '../users/dto/user.dto'
import { LoginRequest } from '@lib/schema'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Omit<UserDto, 'password'>> {
    const user = await this.userService.findOneByCpf(username)
    if (!user) {
      throw new UnauthorizedException('Credentials invalid')
    }

    const match = await this.userService.comparePassword(pass, user.password)
    if (!match) {
      throw new UnauthorizedException('Credentials invalid')
    }

    const { password, ...result } = user['dataValues']
    return result
  }

  public async login(loginRequest: LoginRequest) {
    const user = await this.validateUser(
      loginRequest.cpf,
      loginRequest.password,
    )

    const { name, cpf } = user

    const token = await this.generateToken(user)
    return { user: { name, cpf }, token }
  }

  private async generateToken(user: Omit<UserDto, 'password'>) {
    const token = await this.jwtService.signAsync(user)
    return token
  }
}
