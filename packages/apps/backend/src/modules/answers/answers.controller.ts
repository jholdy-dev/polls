import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { AnswersService } from './answers.service'
import { CreateAnswerDto } from './dto/create-answer.dto'
import { UpdateAnswerDto } from './dto/update-answer.dto'
import { ApiTags } from '@nestjs/swagger'
import { ZodPipe } from 'src/core/pipes/zod-pipe'
import { createAnswerDtoSchema, updateAnswerDtoSchema } from '@lib/schema'

@ApiTags('answers')
@Controller('question/:questionId/answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post()
  create(
    @Param('questionId') questionId: string,
    @Body(new ZodPipe(createAnswerDtoSchema)) createAnswerDto: CreateAnswerDto,
  ) {
    return this.answersService.create(questionId, createAnswerDto)
  }

  @Get()
  findAll(@Param('questionId') questionId: string) {
    return this.answersService.findAll(questionId)
  }

  @Get(':id')
  findOne(@Param('questionId') questionId: string, @Param('id') id: string) {
    return this.answersService.findOne(questionId, id)
  }

  @Patch(':id')
  update(
    @Param('questionId') questionId: string,
    @Param('id') id: string,
    @Body(new ZodPipe(updateAnswerDtoSchema)) updateAnswerDto: UpdateAnswerDto,
  ) {
    return this.answersService.update(questionId, id, updateAnswerDto)
  }

  @Delete(':id')
  remove(@Param('questionId') questionId: string, @Param('id') id: string) {
    return this.answersService.remove(questionId, id)
  }
}
