import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { KeyValue } from '../../common/type';
import { v1RootPath } from '../../path';
import {
  BanListResponse,
  CardDetailsRequest,
  CardDetailsResponse,
  CardListResponse,
} from './v1.dto';
import { V1Service } from './v1.service';

const header: KeyValue = {
  key: 'cache-control',
  value: 'max-age=60, stale-while-revalidate=180, must-revalidate',
};

@ApiTags('monacard1.0')
@Controller(v1RootPath)
export class V1Controller {
  constructor(private v1Service: V1Service) {}

  @Get('/card_list')
  @Header(header.key, header.value)
  @ApiOkResponse({
    type: CardListResponse,
    description:
      'List of all card names but not deleted. The default card name is asset, but if assetLongname exists, it is returned.',
  })
  async findAllNames(): Promise<CardListResponse> {
    return new CardListResponse(await this.v1Service.findAllNames());
  }

  @Get('/card_detail')
  @Header(header.key, header.value)
  @ApiOkResponse({
    type: CardDetailsResponse,
    description: 'Details of cards.',
  })
  async findDetails(
    @Query() query: CardDetailsRequest,
  ): Promise<CardDetailsResponse> {
    return new CardDetailsResponse(await this.v1Service.findAll(query));
  }

  // urlが長くなりすぎることに対する対策
  @Post('/card_detail_post')
  @Header(header.key, header.value)
  @HttpCode(200)
  @ApiOkResponse({
    type: CardDetailsResponse,
    description: 'Details of cards.',
  })
  async findDetailsPost(
    @Body() body: CardDetailsRequest,
  ): Promise<CardDetailsResponse> {
    return new CardDetailsResponse(await this.v1Service.findAll(body));
  }

  @Get('/ban_list')
  @Header(header.key, header.value)
  @ApiOkResponse({
    type: BanListResponse,
    description: 'Banned card list.',
  })
  async findBanlist(): Promise<BanListResponse> {
    return new BanListResponse(await this.v1Service.findAllBanlist());
  }
}
