import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
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
      select: ['asset', 'assetLongname'],
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

  findAll(dto: CardDetailsRequest): Promise<Card[]> {
    const { assets, tag, update_time } = dto;

    if (!assets && !tag && !update_time) {
      throw new HttpException('No parameters.', HttpStatus.BAD_REQUEST);
    }

    const assetArr: string[] | undefined = assets?.split(',');

    const qb = this.cardsRepository.createQueryBuilder();

    if (assetArr && 0 < assetArr.length) {
      // トークンの命名規則に合っていない場合
      assetArr.forEach((as) => {
        if (!/^[a-zA-Z0-9\.\-_@!,]+$/.test(as)) {
          throw new HttpException(
            `Incorrect parameters. asset: ${as}`,
            HttpStatus.BAD_REQUEST,
          );
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
        updateTime: new Date(update_time),
      });
    }

    return qb.orderBy({ id: 'DESC' }).getMany();
  }

  findAllBanlist(): Promise<Card[]> {
    return this.cardsRepository.find({
      where: { status: Not('good') },
      order: { id: 'DESC' },
    });
  }
}
