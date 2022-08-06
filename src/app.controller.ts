import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * For health check.
   * @returns 114514
   */
  @Get('/health')
  @HttpCode(200)
  getHealth(): string {
    return this.appService.getHealth();
  }
}
