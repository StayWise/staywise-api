import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import config from "./config";
import * as morgan from 'morgan';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const isDevelopment =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';  

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.set('trust proxy', isDevelopment);
  app.use(helmet({ 
    contentSecurityPolicy: isDevelopment ? false : undefined,
  }));
  app.use(
    rateLimit({
      windowMs: 1000, 
      max: 100, 
    }),
  );
  if (isDevelopment) {
    app.enableCors({
      origin: "*",
      credentials: true,
    });
  } else {
    app.enableCors({
      origin: [config?.origin?.whitelist],
      credentials: true,
    });
  }
  app.use(morgan("tiny"))

  await app.listen(config.port);
}
bootstrap();

