import { CreateQuizDto } from '@lib/schema'
import { HttpService } from './api'

class QuizService {
  constructor(private readonly httpService: HttpService) {}
  async create(createQuiz: CreateQuizDto): Promise<CreateQuizDto> {
    const response = await this.httpService.post<CreateQuizDto>(
      '/quizzes',
      createQuiz,
    )
    return response
  }
  async get(page = 1, limit = 10): Promise<CreateQuizDto[]> {
    const response = await this.httpService.get<CreateQuizDto[]>(
      `/quizzes?page=${page}&limit=${limit}`,
    )
    return response
  }
}

export const quizzesService = new QuizService(new HttpService())
