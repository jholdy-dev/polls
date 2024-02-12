import { Injectable, UnauthorizedException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
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
  ): Promise<Omit<UserDto, 'password'> | null> {
    const user = await this.userService.findOneByCpf(username)
    if (!user) {
      return null
    }

    const match = await this.comparePassword(pass, user.password)
    if (!match) {
      return null
    }

    const { password, ...result } = user['dataValues']
    return result
  }

  public async login(loginRequest: LoginRequest) {
    const user = await this.userService.findOneByCpf(loginRequest.cpf)
    if (!user) {
      throw new Error('Credentials invalid')
    }

    const token = await this.generateToken(user)
    return { user, token }
  }

  public async create(
    user: UserDto,
  ): Promise<{ user: Omit<UserDto, 'password'>; token: string }> {
    const pass = await this.hashPassword(user.password)

    const userExists = await this.userService.findOneByCpf(user.cpf)
    if (userExists) {
      throw new UnauthorizedException('User already exists')
    }

    const newUser = await this.userService.create({ ...user, password: pass })

    const { password, ...result } = newUser['dataValues']

    const token = await this.generateToken(result)

    return { user: result as Omit<UserDto, 'password'>, token }
  }

  private async generateToken(user: Omit<UserDto, 'password'>) {
    const token = await this.jwtService.signAsync(user)
    return token
  }

  private async hashPassword(password: string) {
    const hash = await bcrypt.hash(password, 10)
    return hash
  }

  private async comparePassword(enteredPassword: string, dbPassword: string) {
    const match = await bcrypt.compare(enteredPassword, dbPassword)
    return match
  }
}
