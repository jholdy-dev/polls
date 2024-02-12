import { Injectable, Inject, NotFoundException } from '@nestjs/common'
import { User } from './user.entity'
import { UserDto } from './dto/user.dto'
import { USER_REPOSITORY } from '../../core/constants'

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async create(user: UserDto): Promise<User> {
    return await this.userRepository.create<User>(user as User)
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
}
