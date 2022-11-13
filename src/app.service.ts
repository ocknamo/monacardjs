import { Injectable } from '@nestjs/common';
import { HealthResponse } from './app.controller';

@Injectable()
export class AppService {
  getHealth(): HealthResponse {
    return { message: '114514' };
  }
}
