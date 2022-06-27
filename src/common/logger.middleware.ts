import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { inspect } from 'util';

interface RequestLog {
  method: string;
  path: string;
  query: string;
  body: string;
  ip: string;
  ips: string[];
}

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);
  use(req: Request, res: Response, next: NextFunction) {
    const logMessage: RequestLog = {
      method: req.method,
      path: req.path,
      query: inspect(req.query),
      body: inspect(req.body),
      ip: req.ip,
      ips: req.ips,
    };

    this.logger.log(logMessage);
    next();
  }
}
