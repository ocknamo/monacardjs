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
  async findAllNames(): Promise<string[]> {
    const allcards = await this.cardsRepository.find({
      where: 'status<>"delete"',
      order: { id: 'DESC' },
    });

    return allcards
      .map((c) => {
        let assetCommonName = c['asset'];
        if (c['assetLongname'] != null) {
          assetCommonName = c['assetLongname'];
        }

        return assetCommonName;
      })
      .filter((nullable) => nullable !== null) as string[];
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
