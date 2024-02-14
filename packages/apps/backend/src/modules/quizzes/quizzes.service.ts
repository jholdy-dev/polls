import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CreateQuizDto } from './dto/create-quiz.dto'
import { UpdateQuizDto } from './dto/update-quiz.dto'
import { QUIZ_REPOSITORY } from 'src/core/constants'
import { Quiz } from './entities/quiz.entity'
import { Question } from '../questions/entities/question.entity'
import { UsersService } from '../users/users.service'

@Injectable()
export class QuizzesService {
  constructor(
    @Inject(QUIZ_REPOSITORY)
    private readonly quizModel: typeof Quiz,
    private readonly userService: UsersService,
  ) {}

  async create(createQuizDto: CreateQuizDto): Promise<Quiz> {
    try {
      const user = await this.userService.findOneById(createQuizDto.userId)
      if (!user) {
        throw new Error('User not found')
      }

      const result = await this.quizModel.create(
        {
          description: createQuizDto.description,
          userId: createQuizDto.userId,
          user,
          questions: createQuizDto.questions as Question[],
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

    await quiz.update(updateQuizDto as Quiz)
    return quiz
  }

  async remove(id: number) {
    const quiz = await this.findOne(id)
    if (!quiz) {
      throw new NotFoundException('Quiz not found')
    }

    await quiz.destroy()
  }
}
