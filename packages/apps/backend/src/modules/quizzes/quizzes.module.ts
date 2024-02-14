import { Module } from '@nestjs/common'
import { QuizzesService } from './quizzes.service'
import { QuizzesController } from './quizzes.controller'
import { quizzesProviders } from './quizzes.providers'
import { UsersModule } from '../users/users.module'
import { QuestionsModule } from '../questions/questions.module'
import { AnswersModule } from '../answers/answers.module'

@Module({
  imports: [UsersModule, QuestionsModule, AnswersModule],
  providers: [...quizzesProviders, QuizzesService],
  controllers: [QuizzesController],
})
export class QuizzesModule {}
