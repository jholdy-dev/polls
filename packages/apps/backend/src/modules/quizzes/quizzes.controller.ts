import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common'
import { QuizzesService } from './quizzes.service'
import { CreateQuizDto } from './dto/create-quiz.dto'
import { UpdateQuizDto } from './dto/update-quiz.dto'
import { ApiTags } from '@nestjs/swagger'
import { ZodPipe } from 'src/core/pipes/zod-pipe'
import {
  answerQuizDtoSchema,
  createQuizDtoSchema,
  updateQuizDtoSchema,
} from '@lib/schema'
import { AuthGuard } from '../auth/auth.guard'
import { AnswersService } from '../answers/answers.service'
import { AnswerQuizDto } from './dto/answer-quiz.dto'

@ApiTags('quizzes')
@Controller('quizzes')
export class QuizzesController {
  constructor(
    private readonly quizzesService: QuizzesService,
    private readonly answersService: AnswersService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('answers')
  answerQuiz(
    @Body(new ZodPipe(answerQuizDtoSchema)) answerQuizDto: AnswerQuizDto,
  ) {
    return this.answersService.answerQuiz(answerQuizDto)
  }

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
