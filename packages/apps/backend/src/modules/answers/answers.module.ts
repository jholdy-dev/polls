import { Module } from '@nestjs/common'
import { AnswersService } from './answers.service'
import { AnswersController } from './answers.controller'
import { answersProviders } from './answers.providers'

@Module({
  exports: [AnswersService],
  controllers: [AnswersController],
  providers: [AnswersService, ...answersProviders],
})
export class AnswersModule {}
