import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { Question } from './entities/question.entity'
import { CreateQuestionDto } from './dto/create-question.dto'
import { UpdateQuestionDto } from './dto/update-question.dto'
import { QUESTION_REPOSITORY } from 'src/core/constants'

@Injectable()
export class QuestionsService {
  constructor(
    @Inject(QUESTION_REPOSITORY)
    private readonly questionModel: typeof Question,
  ) {}

  async create(
    quizId: number,
    createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    const question = {
      description: createQuestionDto.description,
      quizId,
    } as Question

    const result = await this.questionModel.create(question)

    const newQuestion = result['dataValues'] as Question

    return newQuestion
  }

  async findAll(quizId: string): Promise<Question[]> {
    return await this.questionModel.findAll({ where: { quizId } })
  }

  async findOne(quizId: string, id: number): Promise<Question> {
    const question = await this.questionModel.findOne({ where: { id, quizId } })
    if (!question) {
      throw new NotFoundException('Question not found')
    }
    return question
  }

  async update(
    quizId: string,
    id: number,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    const question = await this.findOne(quizId, id)
    if (!updateQuestionDto.description)
      throw new NotFoundException('Question not found')
    question.description = updateQuestionDto.description
    return await question.save()
  }

  async remove(quizId: string, id: number): Promise<{ success: boolean }> {
    const question = await this.findOne(quizId, id)
    await question.destroy()
    return { success: true }
  }
}
