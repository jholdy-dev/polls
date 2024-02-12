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
    return await this.userRepository.findOne<User>({ where: { cpf } })
  }

  async findOneById(id: number): Promise<User | null> {
    return await this.userRepository.findOne<User>({ where: { id } })
  }

  async getUsers(page: number = 1, limit: number = 10): Promise<User[]> {
    const offset = (page - 1) * limit
    return await this.userRepository.findAll<User>({
      offset,
      limit,
    })
  }

  async updateOne(id: number, updateUserDto: UserDto): Promise<User> {
    const user = await this.findOneById(id)
    if (!user) {
      throw new NotFoundException('User not found')
    }
    await user.update(updateUserDto)
    return user
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
