import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);

  const corsOrigin = configService.get<string[]>(
    `CORS_AVAILABLE_ORIGINS_ARRAY`,
  );

  if (corsOrigin) {
    app.enableCors({
      origin: corsOrigin,
      methods: 'GET,HEAD,PUT,PATCH,POST',
      credentials: true,
    });
  }
  const config = new DocumentBuilder()
    .setTitle('Управление банковским аккаунтом API')
    .setVersion('1.0')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      defaultModelsExpandDepth: -1,
    },
  });

  await app.listen(3000);
}

bootstrap();
