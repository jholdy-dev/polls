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
import {
  GenericResponse,
  GenericWithPaginationResponse,
  ReturnSuccess,
} from 'src/dto/generic-response.dto'
import { Quiz } from './entities/quiz.entity'

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
  async create(
    @Body(new ZodPipe(createQuizDtoSchema)) createQuizDto: CreateQuizDto,
  ): Promise<GenericResponse<Quiz>> {
    const result = await this.quizzesService.create(createQuizDto)
    return { data: result }
  }

  @Get()
  async getUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<GenericWithPaginationResponse<Quiz>> {
    const quizzes = await this.quizzesService.get(page, limit)
    return {
      data: quizzes.data,
      page,
      totalCount: quizzes.totalCount,
    }
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<GenericResponse<Quiz | null>> {
    const result = await this.quizzesService.findOne(+id)
    return { data: result }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(new ZodPipe(updateQuizDtoSchema)) updateQuizDto: UpdateQuizDto,
  ): Promise<ReturnSuccess> {
    await this.quizzesService.update(+id, updateQuizDto)
    return { message: 'Quiz updated' }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ReturnSuccess> {
    await this.quizzesService.remove(+id)

    return { message: 'Quiz deleted' }
  }
}
