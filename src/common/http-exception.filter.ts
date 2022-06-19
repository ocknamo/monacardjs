import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    request.method;

    this.logger.error(
      `status: ${status}. message: ${exception.message},
      method: ${request.method},
      url: ${request.url},
      stack: ${exception.stack},
`,
    );

    response.status(status).json({
      statusCode: status,
      error: { message: exception.message },
    });
  }
}
