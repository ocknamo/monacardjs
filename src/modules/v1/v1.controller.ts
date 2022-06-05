import { Controller, Get, Logger, Post } from '@nestjs/common';
import { v1RootPath } from '../../path';
import {
  BanListResponse,
  BanResponse,
  CardDetailsResponse,
  CardListResponse,
} from './v1.dto';
import { V1Service } from './v1.service';

@Controller(v1RootPath)
export class V1Controller {
  constructor(private v1Service: V1Service) {}

  @Get('/card_list')
  async findAllNames(): Promise<CardListResponse> {
    Logger.log('[V1] GET: /card_list');
    const cardNames = await this.v1Service.findAllNames();

    return new CardListResponse(cardNames);
  }

  @Get('/card_detail')
  async findDetails(): Promise<CardDetailsResponse> {
    return new CardDetailsResponse(this.v1Service.findAll());
  }

  // urlが長くなりすぎることに対する対策だそうです
  @Post('/card_detail_post')
  async findDetailsPost(): Promise<CardDetailsResponse> {
    return new CardDetailsResponse(this.v1Service.findAll());
  }

  @Get('/ban_list')
  async findBanlist(): Promise<BanListResponse> {
    return new BanListResponse(
      this.v1Service
        .findAllBanlist()
        .map((res) => new BanResponse(res.asset, res.status, res.updateTime)),
    );
  }
}
