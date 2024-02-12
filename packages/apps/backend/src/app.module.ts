import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { DatabaseModule } from './core/database/database.module'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './modules/auth/auth.module'
import { QuizzesModule } from './modules/quizzes/quizzes.module'
import { AnswersModule } from './modules/answers/answers.module'
import { QuestionsModule } from './modules/questions/questions.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    QuizzesModule,
    AnswersModule,
    QuestionsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
