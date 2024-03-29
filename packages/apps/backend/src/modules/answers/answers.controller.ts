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
import { AnswersService } from './answers.service'
import { CreateAnswerDto } from './dto/create-answer.dto'
import { UpdateAnswerDto } from './dto/update-answer.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ZodPipe } from 'src/core/pipes/zod-pipe'
import { createAnswerDtoSchema, updateAnswerDtoSchema } from '@lib/schema'
import { AuthGuard } from '../auth/auth.guard'
import { GenericResponse, ReturnSuccess } from 'src/dto/generic-response.dto'
import { Answer } from './entities/answer.entity'

@ApiBearerAuth()
@ApiTags('answers')
@Controller('question/:questionId/answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Param('questionId') questionId: number,
    @Body(new ZodPipe(createAnswerDtoSchema)) createAnswerDto: CreateAnswerDto,
  ): Promise<GenericResponse<Answer>> {
    const result = await this.answersService.create(questionId, createAnswerDto)
    return { data: result }
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(
    @Param('questionId') questionId: number,
  ): Promise<GenericResponse<Answer[]>> {
    const result = await this.answersService.findAll(questionId)
    return { data: result }
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(
    @Param('questionId') questionId: number,
    @Param('id') id: number,
  ): Promise<GenericResponse<Answer>> {
    const result = await this.answersService.findOne(questionId, id)
    return { data: result }
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('questionId') questionId: number,
    @Param('id') id: number,
    @Body(new ZodPipe(updateAnswerDtoSchema)) updateAnswerDto: UpdateAnswerDto,
  ): Promise<GenericResponse<Answer>> {
    const result = await this.answersService.update(
      questionId,
      id,
      updateAnswerDto,
    )
    return { data: result }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(
    @Param('questionId') questionId: number,
    @Param('id') id: number,
  ): Promise<ReturnSuccess> {
    await this.answersService.remove(questionId, id)
    return { message: 'Answer deleted' }
  }
}
