/*
 * @Description:
 * @Version: 1.0
 * @Autor: laikt
 * @Date: 2023-08-28 11:45:30
 * @LastEditors: laikt
 * @LastEditTime: 2024-08-05 18:38:56
 */
declare const module: any;
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost } from '@nestjs/core';
import {
  TimeoutInterceptor,
  AllExceptionsFilter,
  HttpExceptionFilter,
  ValidationPipe,
  TransformInterceptor,
  logger,
} from '@app/common';
import * as compression from 'compression';
import * as express from 'express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();

  app.use(express.json()); // 用于解析 application/json
  app.use(express.urlencoded({ extended: true })); // 用于解析 application/x-www-form-urlencoded

  // 监听所有的请求路由，并打印日志
  app.use(logger);
  // 使用拦截器打印出参
  app.useGlobalInterceptors(new TransformInterceptor());
  // 过滤器
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalFilters(new HttpExceptionFilter());
  // 拦截器
  app.useGlobalInterceptors(new TimeoutInterceptor());
  // 全局验证
  app.useGlobalPipes(new ValidationPipe());
  // 在你的初始化文件中的某个地方
  app.use(compression());

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  await app.listen(port);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
