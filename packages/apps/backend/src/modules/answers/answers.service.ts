import { Injectable, Inject, NotFoundException } from '@nestjs/common'
import { Answer } from './entities/answer.entity'
import { CreateAnswerDto } from './dto/create-answer.dto'
import { UpdateAnswerDto } from './dto/update-answer.dto'
import { ANSWER_REPOSITORY } from 'src/core/constants'

@Injectable()
export class AnswersService {
  constructor(
    @Inject(ANSWER_REPOSITORY)
    private readonly answerModel: typeof Answer,
  ) {}

  async create(
    questionId: string,
    createAnswerDto: CreateAnswerDto,
  ): Promise<Answer> {
    const { description } = createAnswerDto
    return await this.answerModel.create<Answer>({
      description,
      questionId,
    } as Answer)
  }

  async findAll(questionId: string): Promise<Answer[]> {
    return await this.answerModel.findAll({ where: { questionId } })
  }

  async findOne(questionId: string, id: string): Promise<Answer> {
    const answer = await this.answerModel.findOne({ where: { id, questionId } })
    if (!answer) {
      throw new NotFoundException(`Answer with ID ${id} not found`)
    }
    return answer
  }

  async update(
    questionId: string,
    id: string,
    updateAnswerDto: UpdateAnswerDto,
  ): Promise<Answer> {
    const { description } = updateAnswerDto
    const [rowsAffected, [updatedAnswer]] = await this.answerModel.update(
      { description },
      { where: { id, questionId }, returning: true },
    )
    if (rowsAffected === 0) {
      throw new NotFoundException(`Answer with ID ${id} not found`)
    }
    return updatedAnswer
  }

  async remove(questionId: string, id: string): Promise<void> {
    const rowsAffected = await this.answerModel.destroy({
      where: { id, questionId },
    })
    if (rowsAffected === 0) {
      throw new NotFoundException(`Answer with ID ${id} not found`)
    }
  }
}
