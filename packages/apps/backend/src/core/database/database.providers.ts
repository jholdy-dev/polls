import { Sequelize } from 'sequelize-typescript'
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants'
import { databaseConfig } from './database.config'
import { User } from '../../modules/users/entities/user.entity'
import { Answer } from '../../modules/answers/entities/answer.entity'
import { Question } from '../../modules/questions/entities/question.entity'
import { Quiz } from '../../modules/quizzes/entities/quiz.entity'

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development
          break
        case TEST:
          config = databaseConfig.test
          break
        case PRODUCTION:
          config = databaseConfig.production
          break
        default:
          config = databaseConfig.development
      }

      console.log('config', config)
      const sequelize = new Sequelize(config)
      sequelize.addModels([User, Quiz, Question, Answer])
      await sequelize.sync()
      return sequelize
    },
  },
]
