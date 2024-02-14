import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CreateQuizDto } from './dto/create-quiz.dto'
import { UpdateQuizDto } from './dto/update-quiz.dto'
import { QUIZ_REPOSITORY } from 'src/core/constants'
import { Quiz } from './entities/quiz.entity'
import { Question } from '../questions/entities/question.entity'
import { UsersService } from '../users/users.service'
import { CreateQuestionDto } from '@lib/schema'
import { QuestionsService } from '../questions/questions.service'

@Injectable()
export class QuizzesService {
  constructor(
    @Inject(QUIZ_REPOSITORY)
    private readonly quizModel: typeof Quiz,
    private readonly userService: UsersService,
    private readonly questionsService: QuestionsService,
  ) {}

  async create(createQuizDto: CreateQuizDto): Promise<Quiz> {
    try {
      const user = await this.userService.findOneById(createQuizDto.userId)
      if (!user) {
        throw new Error('User not found')
      }

      console.log(createQuizDto.questions)

      const result = await this.quizModel.create(
        {
          description: createQuizDto.description,
          userId: createQuizDto.userId,
          user,
          questions: createQuizDto.questions.map((question) => ({
            description: question.description,
          })) as Question[],
          name: createQuizDto.name,
        } as Quiz,
        { include: [Question] },
      )

      return result['dataValues'] as Quiz
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async get(page: number = 1, limit: number = 10) {
    const offset = page * limit
    const result = await this.quizModel.findAll<Quiz>({
      offset,
      limit,
      include: [Question],
    })

    const count = await this.count()

    return {
      data: result,
      page,
      totalCount: count,
    }
  }

  async count(): Promise<number> {
    return await this.quizModel.count()
  }

  async findOne(id: number): Promise<Quiz | null> {
    const result = await this.quizModel.findOne<Quiz>({
      where: { id },
      include: [Question],
    })

    if (!result) {
      return null
    }

    return result['dataValues']
  }

  async update(id: number, updateQuizDto: UpdateQuizDto) {
    const quiz = await this.findOne(id)
    if (!quiz) {
      throw new NotFoundException('Quiz not found')
    }

    await this.quizModel.update(
      {
        name: updateQuizDto.name,
        description: updateQuizDto.description,
      } as Quiz,
      { where: { id } },
    )

    if (!updateQuizDto.questions) return

    const questionsIds = updateQuizDto.questions
      .filter((question) => question.id)
      .map((question) => question.id)

    const diffIdsQuestions = quiz.questions
      .map((question) => question.id)
      .filter((id) => !questionsIds.includes(id))

    await Promise.all(
      diffIdsQuestions.map(async (id) => {
        await this.questionsService.remove(quiz.id, id)
      }),
    )

    await Promise.all(
      updateQuizDto.questions.map(async (question) => {
        if (question.id) {
          await this.questionsService.update(quiz.id, question.id, question)
        } else {
          await this.questionsService.create(quiz.id, {
            description: question.description,
            quizId: quiz.id,
          } as CreateQuestionDto)
        }
      }),
    )
  }

  async remove(id: number) {
    const quiz = await this.findOne(id)
    if (!quiz) {
      throw new NotFoundException('Quiz not found')
    }

    await this.quizModel.destroy({ where: { id } })
  }
}
