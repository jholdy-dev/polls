import { Module } from '@nestjs/common'
import { QuizzesService } from './quizzes.service'
import { QuizzesController } from './quizzes.controller'
import { quizzesProviders } from './quizzes.providers'
import { UsersModule } from '../users/users.module'
import { QuestionsModule } from '../questions/questions.module'

@Module({
  imports: [UsersModule, QuestionsModule],
  providers: [...quizzesProviders, QuizzesService],
  controllers: [QuizzesController],
})
export class QuizzesModule {}
