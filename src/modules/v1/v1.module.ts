import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from '../../entity';
import { V1Controller, V1Service } from '.';

@Module({
  imports: [TypeOrmModule.forFeature([Card])],
  controllers: [V1Controller],
  providers: [V1Service],
})
export class V1Module {}
