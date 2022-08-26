import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Request, Response, NextFunction } from 'express';
import { inspect } from 'util';

interface RequestLog {
  id: string;
  method: string;
  path: string;
  query: string;
  body: string;
  ip: string;
  ips: string[];
  userAgent?: string;
}

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);
  use(req: Request, res: Response, next: NextFunction) {
    if (!req['requestId']) {
      req['requestId'] = randomUUID();
    }

    const logMessage: RequestLog = {
      id: req['requestId'],
      method: req.method,
      path: req.path,
      query: inspect(req.query, { depth: 4 }),
      body: inspect(req.body, { depth: 4 }),
      ip: req.ip,
      ips: req.ips,
      userAgent: req.headers['user-agent'],
    };

    this.logger.log(JSON.stringify(logMessage).replaceAll('\n', ''));
    next();
  }
}
