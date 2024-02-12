import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { ZodFilter } from './core/filters/zod-filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = new DocumentBuilder()
    .setTitle('Polls api')
    .setDescription('The polls API description')
    .setVersion('1.0')
    .addTag('polls')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  app.useGlobalFilters(new ZodFilter())

  await app.listen(3000)
}
bootstrap()
