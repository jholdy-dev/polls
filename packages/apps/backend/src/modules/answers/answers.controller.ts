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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ZodPipe } from 'src/core/pipes/zod-pipe'
import { createAnswerDtoSchema, updateAnswerDtoSchema } from '@lib/schema'

@ApiBearerAuth()
@ApiTags('answers')
@Controller('question/:questionId/answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post()
  create(
    @Param('questionId') questionId: number,
    @Body(new ZodPipe(createAnswerDtoSchema)) createAnswerDto: CreateAnswerDto,
  ) {
    return this.answersService.create(questionId, createAnswerDto)
  }

  @Get()
  findAll(@Param('questionId') questionId: number) {
    return this.answersService.findAll(questionId)
  }

  @Get(':id')
  findOne(@Param('questionId') questionId: number, @Param('id') id: number) {
    return this.answersService.findOne(questionId, id)
  }

  @Patch(':id')
  update(
    @Param('questionId') questionId: number,
    @Param('id') id: number,
    @Body(new ZodPipe(updateAnswerDtoSchema)) updateAnswerDto: UpdateAnswerDto,
  ) {
    return this.answersService.update(questionId, id, updateAnswerDto)
  }

  @Delete(':id')
  remove(@Param('questionId') questionId: number, @Param('id') id: number) {
    return this.answersService.remove(questionId, id)
  }
}
