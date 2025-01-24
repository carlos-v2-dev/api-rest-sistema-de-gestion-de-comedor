import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    app.enableCors();

  const logger = new Logger("Main")

  app.useGlobalPipes( new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions:{
      enableImplicitConversion: true
    }
  }));


  await app.listen(process.env.PORT ?? 3000);

  logger.log(`server runnig on port ${process.env.PORT}`)

}
bootstrap();
