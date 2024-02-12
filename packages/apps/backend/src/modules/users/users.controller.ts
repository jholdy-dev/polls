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

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('users')
  async getUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.usersService.getUsers(page, limit)
  }

  @Post('user')
  async createUser(@Body() createUserDto: UserDto) {
    return this.usersService.create(createUserDto)
  }

  @Patch('user/:id')
  async updateUser(@Param('id') id: number, @Body() updateUserDto: UserDto) {
    return this.usersService.updateOne(id, updateUserDto)
  }

  @Delete('user/:id')
  async deleteUser(@Param('id') id: number) {
    return this.usersService.deleteOne(id)
  }
}
