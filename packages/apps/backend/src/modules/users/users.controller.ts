import { userSchema } from '@lib/schema'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ZodPipe } from 'src/core/pipes/zod-pipe'
import { CreateUserResponse } from './dto/create-user-response.dto'
import { GetUsersReponseDto } from './dto/get-users-response.dto'
import { UserDto } from './dto/user.dto'
import { UsersService } from './users.service'
import { UpdateUserResponse } from './dto/update-user-response.dto'
import { DeleteUserResponse } from './dto/dalete-user-response.dto'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<GetUsersReponseDto> {
    const result = await this.usersService.getUsers(page, limit)
    return result
  }

  @Post()
  async createUser(
    @Body(new ZodPipe(userSchema)) createUserDto: UserDto,
  ): Promise<CreateUserResponse> {
    const result = await this.usersService.create(createUserDto)
    return { data: result }
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body(new ZodPipe(userSchema)) updateUserDto: UserDto,
  ): Promise<UpdateUserResponse> {
    const result = await this.usersService.updateOne(id, updateUserDto)
    return { data: result }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<DeleteUserResponse> {
    await this.usersService.deleteOne(id)
    return { message: 'User deleted' }
  }
}
