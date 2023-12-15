/*
 * @Description:
 * @Version: 1.0
 * @Autor: laikt
 * @Date: 2023-08-29 17:37:48
 * @LastEditors: laikt
 * @LastEditTime: 2023-09-21 15:23:43
 */
// src/filter/http-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '../utils/log4js';
import { GqlArgumentsHost } from '@nestjs/graphql';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    if (host.getType() === 'http') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
      const status = exception.getStatus();
      const logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            Request original url: ${request.originalUrl}
            Method: ${request.method}
            IP: ${request.ip}
            Status code: ${status}
            Response: ${exception.toString()} \n  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        `;
      Logger.info(logFormat);
      response.status(status).json({
        statusCode: status,
        error: exception.message,
        msg: `${status >= 500 ? 'Service Error' : 'Client Error'}`,
      });
    } else {
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
      Logger.info(logFormat);
      return exception;
    }
  }
}
