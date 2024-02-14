import { Injectable, Inject, NotFoundException } from '@nestjs/common'
import { Answer } from './entities/answer.entity'
import { CreateAnswerDto } from './dto/create-answer.dto'
import { UpdateAnswerDto } from './dto/update-answer.dto'
import { ANSWER_REPOSITORY } from 'src/core/constants'
import { AnswerQuizDto } from '@lib/schema'

@Injectable()
export class AnswersService {
  constructor(
    @Inject(ANSWER_REPOSITORY)
    private readonly answerModel: typeof Answer,
  ) {}

  async answerQuiz(answerQuizDto: AnswerQuizDto): Promise<void> {
    const { questions } = answerQuizDto
    await Promise.all(
      questions.map(async (question) => {
        const { id, answers } = question

        await this.answerModel.create<Answer>({
          description: answers[0].description,
          questionId: id,
        } as Answer)
      }),
    )
  }

  async create(
    questionId: number,
    createAnswerDto: CreateAnswerDto,
  ): Promise<Answer> {
    const { description } = createAnswerDto
    return await this.answerModel.create<Answer>({
      description,
      questionId,
    } as Answer)
  }

  async findAll(questionId: number): Promise<Answer[]> {
    return await this.answerModel.findAll({ where: { questionId } })
  }

  async findOne(questionId: number, id: number): Promise<Answer> {
    const answer = await this.answerModel.findOne({ where: { id, questionId } })
    if (!answer) {
      throw new NotFoundException(`Answer with ID ${id} not found`)
    }
    return answer
  }

  async update(
    questionId: number,
    id: number,
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

  async remove(questionId: number, id: number): Promise<void> {
    const rowsAffected = await this.answerModel.destroy({
      where: { id, questionId },
    })
    if (rowsAffected === 0) {
      throw new NotFoundException(`Answer with ID ${id} not found`)
    }
  }
}
