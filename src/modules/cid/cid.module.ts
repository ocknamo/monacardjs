import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from '../../entity';
import { CidController, CidService } from '.';

@Module({
  imports: [TypeOrmModule.forFeature([Card])],
  controllers: [CidController],
  providers: [CidService],
})
export class CidModule {}
