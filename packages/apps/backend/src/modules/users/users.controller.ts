import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { UserDto } from './dto/user.dto'
import { ZodPipe } from 'src/core/pipes/zod-pipe'
import { userSchema } from '@lib/schema'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.usersService.getUsers(page, limit)
  }

  @Post()
  async createUser(@Body(new ZodPipe(userSchema)) createUserDto: UserDto) {
    return this.usersService.create(createUserDto)
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: number,
    @Body(new ZodPipe(userSchema)) updateUserDto: UserDto,
  ) {
    return this.usersService.updateOne(id, updateUserDto)
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.usersService.deleteOne(id)
  }
}
