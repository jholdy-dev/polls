import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { USER_REPOSITORY } from '../../core/constants'
import { UserDto } from './dto/user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async create(user: UserDto): Promise<User> {
    const userExists = await this.findOneByCpf(user.cpf)
    if (userExists) {
      throw new NotFoundException('User already exists')
    }
    const pass = await this.hashPassword(user.password)
    user.password = pass

    const newUser = await this.userRepository.create<User>(user as User)

    const { password, ...result } = newUser['dataValues']

    return result as User
  }

  async findOneByCpf(cpf: string): Promise<User | null> {
    const result = await this.userRepository.findOne<User>({ where: { cpf } })
    if (!result) {
      return null
    }
    const { password, ...user } = result['dataValues']
    return user as User
  }

  async findOneById(id: number): Promise<User | null> {
    const result = await this.userRepository.findOne<User>({ where: { id } })
    if (!result) {
      return null
    }
    const { password, ...user } = result['dataValues']
    return user as User
  }

  async getUsers(page: number = 1, limit: number = 10) {
    const offset = page * limit
    const result = await this.userRepository.findAll<User>({
      offset,
      limit,
    })

    const count = await this.count()

    return {
      data: result.map((user) => {
        const { password, ...result } = user['dataValues']
        return result as User
      }),
      page,
      totalCount: count,
    }
  }

  async count(): Promise<number> {
    return await this.userRepository.count()
  }

  async updateOne(id: number, updateUserDto: UserDto): Promise<User> {
    const user = await this.findOneById(id)
    if (!user) {
      throw new NotFoundException('User not found')
    }

    if (updateUserDto.password) {
      updateUserDto.password = await this.hashPassword(updateUserDto.password)
    }

    await this.userRepository.update(updateUserDto, {
      where: { id },
    })
    const { password, ...userInfo } = user

    return userInfo as User
  }

  async deleteOne(id: number): Promise<void> {
    const user = await this.findOneById(id)
    if (!user) {
      throw new NotFoundException('User not found')
    }
    await user.destroy()
  }

  private async hashPassword(password: string) {
    const hash = await bcrypt.hash(password, 10)
    return hash
  }

  async comparePassword(enteredPassword: string, dbPassword: string) {
    const match = await bcrypt.compare(enteredPassword, dbPassword)
    return match
  }
}
