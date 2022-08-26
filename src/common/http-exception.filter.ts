import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { inspect } from 'util';

export interface ErrorLog {
  id?: string;
  status?: number;
  message?: string;
  method?: string;
  requestUrl?: string;
  stack?: string;
  error: string;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const log: ErrorLog = {
      id: request['requestId'],
      status: status,
      message: exception.message,
      method: request.method,
      requestUrl: request.url,
      stack: exception.stack,
      error: inspect(exception, { depth: 4 }),
    };

    this.logger.error(JSON.stringify(log).replaceAll('\n', ''));

    response.status(status).json({
      statusCode: status,
      error: { message: exception.message },
    });
  }
}
