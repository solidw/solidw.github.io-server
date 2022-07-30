import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://solidw.github.io',
  });
  await app.listen(process.env.PORT ?? 80);
}
bootstrap();
