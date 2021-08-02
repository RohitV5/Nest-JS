import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';
import {Logger} from '@nestjs/common'

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  app.enableCors()

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  const port = 3000;
  await app.listen(port);
  logger.log(`Application Listening on port ${port}`)
}
bootstrap();
