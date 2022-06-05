import { Module } from '@nestjs/common';
import { CidController, CidService } from '.';

@Module({
  controllers: [CidController],
  providers: [CidService],
})
export class CidModule {}
