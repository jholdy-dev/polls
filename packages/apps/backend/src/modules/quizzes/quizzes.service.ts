import { Inject, Injectable } from '@nestjs/common'
import { CreateQuizDto } from './dto/create-quiz.dto'
import { UpdateQuizDto } from './dto/update-quiz.dto'
import { QUIZ_REPOSITORY } from 'src/core/constants'
import { Quiz } from './entities/quiz.entity'
import { Question } from '../questions/entities/question.entity'
import { UsersService } from '../users/users.service'
import { QuestionsService } from '../questions/questions.service'

@Injectable()
export class QuizzesService {
  constructor(
    @Inject(QUIZ_REPOSITORY)
    private readonly quizModel: typeof Quiz,
    private readonly userService: UsersService,
    private readonly questionService: QuestionsService,
  ) {}

  async create(createQuizDto: CreateQuizDto): Promise<Quiz> {
    try {
      const user = await this.userService.findOneById(createQuizDto.userId)
      if (!user) {
        throw new Error('User not found')
      }

      const result = await this.quizModel.create({
        description: createQuizDto.description,
        userId: createQuizDto.userId,
        user,
        questions: createQuizDto.questions as Question[],
        name: createQuizDto.name,
      } as Quiz)
      const { id } = result['dataValues']

      const newQuestions = await Promise.all(
        createQuizDto.questions.map(async (question) => {
          const newQuestion = await this.questionService.create(id, {
            ...question,
            quizId: id,
          })
          return { ...newQuestion['dataValues'] }
        }),
      )

      const quiz = { ...result['dataValues'], questions: newQuestions }

      return quiz as Quiz
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  findAll() {
    return `This action returns all quizzes`
  }

  findOne(id: number) {
    return `This action returns a #${id} quiz`
  }

  update(id: number, _updateQuizDto: UpdateQuizDto) {
    return `This action updates a #${id} quiz`
  }

  remove(id: number) {
    return `This action removes a #${id} quiz`
  }
}
