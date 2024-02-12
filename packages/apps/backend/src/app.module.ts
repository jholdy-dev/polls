import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { DatabaseModule } from './core/database/database.module'
import { ConfigModule } from '@nestjs/config'
import { QuizzesModule } from './modules/quizzes/quizzes.module'
import { AnswersModule } from './modules/answers/answers.module'
import { QuestionsModule } from './modules/questions/questions.module'
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    QuizzesModule,
    AnswersModule,
    QuestionsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
