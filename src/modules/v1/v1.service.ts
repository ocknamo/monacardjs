import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from '../../entity';
import { CardDetailsRequest } from './v1.dto';

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

  findAll(query: CardDetailsRequest): Promise<Card[]> {
    console.log('LOG→ run find all', query);
    const { assets, tag, update_time } = query;

    if (!assets && !tag && !update_time) {
      throw new Error('No parameters.'); // TODO: 400 error
    }

    const assetArr: string[] | undefined = assets?.split(',');

    const qb = this.cardsRepository.createQueryBuilder();

    if (assetArr && 0 < assetArr.length) {
      // トークンの命名規則に合っていない場合
      assetArr.forEach((as) => {
        if (!/^[a-zA-Z0-9\.\-_@!,]+$/.test(as)) {
          throw new Error(`Incorrect parameters. asset: ${as}`); // TODO: 400 error
        }
      });

      qb.where('asset IN(:...assets)', { assets: assetArr }).orWhere(
        'assetLongname IN(:...assets)',
        { assets: assetArr },
      );
    }

    if (tag) {
      qb.andWhere('tag = :tag', { tag: tag });
    }

    if (update_time) {
      qb.andWhere('updateTime > :updateTime', {
        updateTime: update_time,
      });
    }

    return qb.getMany();
  }

  findAllBanlist(): { asset: string; status: string; updateTime: string }[] {
    console.log('LOG→ run find all ban list');
    return [];
  }
}
