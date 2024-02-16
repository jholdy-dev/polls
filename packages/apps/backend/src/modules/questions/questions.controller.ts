import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common'
import { QuestionsService } from './questions.service'
import { CreateQuestionDto } from './dto/create-question.dto'
import { UpdateQuestionDto } from './dto/update-question.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ZodPipe } from 'src/core/pipes/zod-pipe'
import { createQuestionDtoSchema, updateQuestionDtoSchema } from '@lib/schema'
import { AuthGuard } from '../auth/auth.guard'
import { GenericResponse } from 'src/dto/generic-response.dto'
import { Question } from './entities/question.entity'

@ApiBearerAuth()
@ApiTags('questions')
@Controller('quiz/:quizId/questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Param('quizId') quizId: number,
    @Body(new ZodPipe(createQuestionDtoSchema))
    createQuestionDto: CreateQuestionDto,
  ): Promise<GenericResponse<Question>> {
    const result = await this.questionsService.create(quizId, createQuestionDto)
    return { data: result }
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(
    @Param('quizId') quizId: string,
  ): Promise<GenericResponse<Question[]>> {
    const result = await this.questionsService.findAll(quizId)
    return { data: result }
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(
    @Param('quizId') quizId: string,
    @Param('id') id: string,
  ): Promise<GenericResponse<Question>> {
    const question = await this.questionsService.findOne(quizId, +id)
    if (!question) {
      throw new NotFoundException('Question not found')
    }
    return {
      data: question,
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('quizId') quizId: string,
    @Param('id') id: string,
    @Body(new ZodPipe(updateQuestionDtoSchema))
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<GenericResponse<Question>> {
    const updatedQuestion = await this.questionsService.update(
      quizId,
      +id,
      updateQuestionDto,
    )
    if (!updatedQuestion) {
      throw new NotFoundException('Question not found')
    }
    return {
      data: updatedQuestion,
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(
    @Param('quizId') quizId: string,
    @Param('id') id: string,
  ): Promise<GenericResponse<{ success: boolean }>> {
    const deletedQuestion = await this.questionsService.remove(quizId, +id)
    if (!deletedQuestion) {
      throw new NotFoundException('Question not found')
    }
    return {
      data: deletedQuestion,
    }
  }
}
