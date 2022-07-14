import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from '../../entity';
import { CidRequest } from './cid.dto';
import { CidInterface } from './cid.interface';

@Injectable()
export class CidService {
  constructor(
    @InjectRepository(Card)
    private readonly cardsRepository: Repository<Card>,
  ) {}
  async findAllCids(query: CidRequest): Promise<CidInterface[]> {
    const empty = '';
    const validStatus = 'good';
    const qb = this.cardsRepository
      .createQueryBuilder('card')
      .where('cid != :empty', { empty })
      .andWhere('status=:validStatus', { validStatus });

    if (query.update_time) {
      qb.andWhere('updateTime > :updateTime', {
        updateTime: new Date(query.update_time),
      });
    }

    qb.select(['card.cid', 'card.updateTime']);
    qb.orderBy({ id: 'DESC' });
    const cards = await qb.getMany();

    return cards.map((c) => ({ cid: c.cid, updateTime: c.updateTime }));
  }
}
