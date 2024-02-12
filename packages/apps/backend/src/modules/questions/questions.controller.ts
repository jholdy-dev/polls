import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common'
import { QuestionsService } from './questions.service'
import { CreateQuestionDto } from './dto/create-question.dto'
import { UpdateQuestionDto } from './dto/update-question.dto'
import { ApiTags } from '@nestjs/swagger'
import { ZodPipe } from 'src/core/pipes/zod-pipe'
import { createQuestionDtoSchema, updateQuestionDtoSchema } from '@lib/schema'

@ApiTags('questions')
@Controller('quiz/:quizId/questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  create(
    @Param('quizId') quizId: string,
    @Body(new ZodPipe(createQuestionDtoSchema))
    createQuestionDto: CreateQuestionDto,
  ) {
    return this.questionsService.create(quizId, createQuestionDto)
  }

  @Get()
  async findAll(@Param('quizId') quizId: string) {
    return await this.questionsService.findAll(quizId)
  }

  @Get(':id')
  async findOne(@Param('quizId') quizId: string, @Param('id') id: string) {
    const question = await this.questionsService.findOne(quizId, +id)
    if (!question) {
      throw new NotFoundException('Question not found')
    }
    return question
  }

  @Patch(':id')
  async update(
    @Param('quizId') quizId: string,
    @Param('id') id: string,
    @Body(new ZodPipe(updateQuestionDtoSchema))
    updateQuestionDto: UpdateQuestionDto,
  ) {
    const updatedQuestion = await this.questionsService.update(
      quizId,
      +id,
      updateQuestionDto,
    )
    if (!updatedQuestion) {
      throw new NotFoundException('Question not found')
    }
    return updatedQuestion
  }

  @Delete(':id')
  async remove(@Param('quizId') quizId: string, @Param('id') id: string) {
    const deletedQuestion = await this.questionsService.remove(quizId, +id)
    if (!deletedQuestion) {
      throw new NotFoundException('Question not found')
    }
    return deletedQuestion
  }
}
