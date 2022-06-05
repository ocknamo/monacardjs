import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from '../../entity';
import { CardDetail } from './v1.interface';

@Injectable()
export class V1Service {
  constructor(
    @InjectRepository(Card)
    private readonly cardsRepository: Repository<Card>,
  ) {}
  findAllNames(): string[] {
    console.log('LOG→ run find all names');
    return [];
  }

  findAll(): CardDetail[] {
    console.log('LOG→ run find all');
    return [];
  }

  findAllBanlist(): { asset: string; status: string; updateTime: string }[] {
    console.log('LOG→ run find all ban list');
    return [];
  }
}
