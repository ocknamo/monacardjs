import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { v1RootPath } from '../../path';
import {
  BanListResponse,
  BanResponse,
  CardDetailsRequest,
  CardDetailsResponse,
  CardListResponse,
} from './v1.dto';
import { V1Service } from './v1.service';

@Controller(v1RootPath)
export class V1Controller {
  constructor(private v1Service: V1Service) {}

  @Get('/card_list')
  async findAllNames(): Promise<CardListResponse> {
    return new CardListResponse(await this.v1Service.findAllNames());
  }

  @Get('/card_detail')
  async findDetails(
    @Query() query: CardDetailsRequest,
  ): Promise<CardDetailsResponse> {
    return new CardDetailsResponse(await this.v1Service.findAll(query));
  }

  // urlが長くなりすぎることに対する対策
  @Post('/card_detail_post')
  async findDetailsPost(
    @Body() body: CardDetailsRequest,
  ): Promise<CardDetailsResponse> {
    return new CardDetailsResponse(await this.v1Service.findAll(body));
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
