import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common'
import { QuizzesService } from './quizzes.service'
import { CreateQuizDto } from './dto/create-quiz.dto'
import { UpdateQuizDto } from './dto/update-quiz.dto'
import { ApiTags } from '@nestjs/swagger'
import { ZodPipe } from 'src/core/pipes/zod-pipe'
import { createQuizDtoSchema, updateQuizDtoSchema } from '@lib/schema'
import { AuthGuard } from '../auth/auth.guard'

@ApiTags('quizzes')
@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  create(@Body(new ZodPipe(createQuizDtoSchema)) createQuizDto: CreateQuizDto) {
    return this.quizzesService.create(createQuizDto)
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.quizzesService.findAll()
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizzesService.findOne(+id)
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodPipe(updateQuizDtoSchema)) updateQuizDto: UpdateQuizDto,
  ) {
    return this.quizzesService.update(+id, updateQuizDto)
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizzesService.remove(+id)
  }
}
