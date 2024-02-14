import { CreateQuizDto } from '@lib/schema'
import { HttpService } from './api'
import { ServiceResponse } from '../components'

interface GetQuizzesResponse extends ServiceResponse {
  data: CreateQuizDto[]
  page: number
  totalCount: number
}

class QuizService {
  constructor(private readonly httpService: HttpService) {}
  async create(createQuiz: CreateQuizDto): Promise<CreateQuizDto> {
    const response = await this.httpService.post<CreateQuizDto>(
      '/quizzes',
      createQuiz,
    )
    return response
  }
  async get(page = 1, limit = 10): Promise<GetQuizzesResponse> {
    const response = await this.httpService.get<GetQuizzesResponse>(
      `/quizzes?page=${page}&limit=${limit}`,
    )
    return response
  }
}

export const quizzesService = new QuizService(new HttpService())
