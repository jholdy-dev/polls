import { Injectable, Inject } from '@nestjs/common'
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
}
