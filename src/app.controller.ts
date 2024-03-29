import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiOkResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

export class HealthResponse {
  @ApiProperty({ type: String })
  message = '114514';
}

@ApiTags('utilities')
@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * For health check.
   * @returns 114514
   */
  @Get('/health')
  @HttpCode(200)
  @ApiOkResponse({
    type: HealthResponse,
    description: 'Health check.',
  })
  getHealth(): HealthResponse {
    return this.appService.getHealth();
  }
}
