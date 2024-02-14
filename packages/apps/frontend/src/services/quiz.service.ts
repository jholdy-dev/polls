import { CreateQuizDto, UpdateQuizDto } from '@lib/schema'
import { HttpService } from './api'
import { ListService, ServiceResponse } from '../components'

interface GetQuizzesResponse extends ServiceResponse {
  data: CreateQuizDto[]
  page: number
  totalCount: number
}

class QuizService implements ListService<CreateQuizDto> {
  constructor(private readonly httpService: HttpService) {}
  async update(id: number, data: UpdateQuizDto) {
    const result = await this.httpService.patch<CreateQuizDto>(
      `/quizzes/${id}`,
      data,
    )
    return result
  }
  async delete(id: string): Promise<any> {
    await this.httpService.delete(`/quizzes/${id}`)
  }
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
