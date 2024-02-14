import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import { QuizzesService } from './quizzes.service'
import { CreateQuizDto } from './dto/create-quiz.dto'
import { UpdateQuizDto } from './dto/update-quiz.dto'
import { ApiTags } from '@nestjs/swagger'
import { ZodPipe } from 'src/core/pipes/zod-pipe'
import { createQuizDtoSchema, updateQuizDtoSchema } from '@lib/schema'

@ApiTags('quizzes')
@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  create(@Body(new ZodPipe(createQuizDtoSchema)) createQuizDto: CreateQuizDto) {
    return this.quizzesService.create(createQuizDto)
  }

  @Get()
  async getUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.quizzesService.get(page, limit)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizzesService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodPipe(updateQuizDtoSchema)) updateQuizDto: UpdateQuizDto,
  ) {
    return this.quizzesService.update(+id, updateQuizDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizzesService.remove(+id)
  }
}
