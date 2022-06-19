import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { inspect } from 'util';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);
  use(req: Request, res: Response, next: NextFunction) {
    const method = req.method;
    const path = req.path;
    const query: any = req.query;
    const body: any = req.body;
    const logMessage = `${method}: ${path},
    query: ${inspect(query)},
    body: ${inspect(body)}`;

    this.logger.log(logMessage);
    next();
  }
}
