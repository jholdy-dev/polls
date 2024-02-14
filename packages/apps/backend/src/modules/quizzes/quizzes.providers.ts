import { QUIZ_REPOSITORY } from 'src/core/constants'
import { Quiz } from './entities/quiz.entity'

export const quizzesProviders = [
  {
    provide: QUIZ_REPOSITORY,
    useValue: Quiz,
  },
]
