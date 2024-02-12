import { Module } from '@nestjs/common'
import { QuestionsController } from './questions.controller'
import { QuestionsService } from './questions.service'
import { questionsProviders } from './questions.providers'

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsService, ...questionsProviders],
})
export class QuestionsModule {}
