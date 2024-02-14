import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { UserDto } from './dto/user.dto'
import { ZodPipe } from 'src/core/pipes/zod-pipe'
import { userSchema } from '@lib/schema'
import { ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '../auth/auth.guard'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.usersService.getUsers(page, limit)
  }

  @UseGuards(AuthGuard)
  @Post()
  async createUser(@Body(new ZodPipe(userSchema)) createUserDto: UserDto) {
    return this.usersService.create(createUserDto)
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateUser(
    @Param('id') id: number,
    @Body(new ZodPipe(userSchema)) updateUserDto: UserDto,
  ) {
    return this.usersService.updateOne(id, updateUserDto)
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.usersService.deleteOne(id)
  }
}
