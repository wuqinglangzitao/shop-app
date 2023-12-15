/*
 * @Description:
 * @Version: 1.0
 * @Autor: laikt
 * @Date: 2023-08-29 17:37:48
 * @LastEditors: laikt
 * @LastEditTime: 2023-09-22 14:09:30
 */
/**
 * 捕获所有异常
 */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Logger } from '../utils/log4js';
import { HttpAdapterHost } from '@nestjs/core';
import {
  GqlContextType,
  GqlArgumentsHost,
  GqlExceptionFilter,
} from '@nestjs/graphql';

@Catch()
export class AllExceptionsFilter
  implements ExceptionFilter, GqlExceptionFilter
{
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    // const response = ctx.getResponse();
    const request = ctx.getRequest();
    if (host.getType<GqlContextType>() === 'graphql') {
      // 处理 GraphQL 异常
      return this.handleGraphQLError({
        exception,
        host,
      });
    } else {
      // 处理 HTTP 异常
      this.handleHttpError({ exception, ctx, request });
    }
  }

  private handleGraphQLError({ exception, host }) {
    const gqlHost = GqlArgumentsHost.create(host);
    const info = gqlHost.getInfo();
    const request = gqlHost.getContext().req;
    const logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            Request original url: ${request.originalUrl}
            Method: ${info.fieldName}
            IP: ${request?.ip}
            ContextType:'graphql'
            Response: ${exception.toString()} \n  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        `;
    Logger.error(logFormat);

    return exception;
  }

  private handleHttpError({ exception, ctx, request }) {
    // 在这里处理 HTTP 异常，可以根据不同的异常类型自定义返回的错误响应
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            Request original url: ${request.originalUrl}
            Method: ${request.method}
            IP: ${request.ip}
            Status code: ${httpStatus}
            Response: ${exception} \n  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        `;
    Logger.error(logFormat);
    const responseBody = {
      statusCode: httpStatus,
      timestamp: Date.now(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
