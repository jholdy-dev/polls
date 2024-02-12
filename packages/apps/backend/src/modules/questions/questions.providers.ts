import { Question } from './entities/question.entity'
import { QUESTION_REPOSITORY } from '../../core/constants'

export const questionsProviders = [
  {
    provide: QUESTION_REPOSITORY,
    useValue: Question,
  },
]
