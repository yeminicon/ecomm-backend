import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: ['https://deepisces.com.ng', 'http://localhost:5173'], // Allow only specific origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Specify allowed methods
    allowedHeaders: 'Content-Type, Authorization', // Specify allowed headers
    credentials: true, // Allow cookies to be sent with requests
  });

  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT || 8081;
  await app.listen(port);
  console.log(`Server is running on http://localhost:${port}`);
}
bootstrap();
