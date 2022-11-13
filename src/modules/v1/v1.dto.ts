/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { dateToUnixTimeSeconds, escapeHtml } from '@monacardjs/lib';
import { Card } from 'src/entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// TODO: OPEN API

/**
 * Request
 */
export class CardDetailsRequest {
  @ApiPropertyOptional({
    description: 'Asset names. Multi names are joined by commas.',
    example: 'MIRRORSELFIE,WASHIO.sweet,JERSEYBLUE',
    type: String,
  })
  @IsOptional()
  @IsString()
  assets?: string;

  @ApiPropertyOptional({
    description: 'Tag information.',
    example: 'モナコインちゃん',
    type: String,
  })
  @IsOptional()
  @IsString()
  tag?: string;

  @ApiPropertyOptional({
    description:
      'Number string as Update Time of card. Cards updated since the specified unixtime can be retrieved.',
    example: '1646291515',
    type: String,
  })
  @IsOptional()
  @Transform((p) => Number(p.value))
  @IsNumber({ allowNaN: false })
  update_time?: number;
}

/**
 * Response
 */

export class CardListResponse {
  @ApiProperty()
  list: string[];
  constructor(cards: string[]) {
    this.list = cards;
  }
}

export class CardDetailResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  asset_common_name: string;

  @ApiProperty()
  asset: string;

  @ApiProperty()
  asset_longname: string | null;

  @ApiProperty()
  assetgroup: string | null;

  @ApiProperty()
  card_name: string;

  @ApiProperty()
  owner_name: string;

  @ApiProperty()
  imgur_url: string;

  @ApiProperty()
  add_description: string;

  /**
   * tw_id and tw_name are always empty. It is not bug and not planned to be used.
   * Only for card.mona.jp compatibility when called api.
   * FYI. https://github.com/nachat1/MonacardHub/issues/8
   */
  @ApiProperty()
  tw_id: string;

  @ApiProperty()
  tw_name: string;

  @ApiProperty()
  tag: string;

  @ApiProperty()
  cid: string;

  @ApiProperty()
  ver: string;

  @ApiProperty()
  is_good_status: boolean;

  @ApiProperty()
  regist_time: string;

  @ApiProperty()
  update_time: string;

  constructor(card: Card) {
    this.id = card.id!;
    this.asset_common_name = card.assetLongname || card.asset!;
    this.asset = card.asset!;
    this.asset_longname = card.assetLongname;
    this.assetgroup = card.assetGroup;
    this.card_name = escapeHtml(card.name ?? '');
    this.owner_name = escapeHtml(card.issuer ?? '');
    this.imgur_url = escapeHtml(card.imgur ?? '');
    this.add_description = escapeHtml(card.description ?? '');
    this.tw_id = '';
    this.tw_name = '';
    this.tag = escapeHtml(card.tag);
    this.cid = escapeHtml(card.cid);
    this.ver = escapeHtml(card.ver.toString());
    this.is_good_status = card.status === 'good';
    this.regist_time = dateToUnixTimeSeconds(card.registTime);
    this.update_time = dateToUnixTimeSeconds(card.updateTime);
  }
}

export class CardDetailsResponse {
  @ApiProperty({ type: CardDetailResponse, isArray: true })
  details: CardDetailResponse[];
  constructor(cards: Card[]) {
    this.details = cards.map((c) => new CardDetailResponse(c));
  }
}

export class BanResponse {
  @ApiProperty()
  asset: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  update_time: string;
  constructor(card: Card) {
    this.asset = card.asset;
    this.status = card.status;
    this.update_time = dateToUnixTimeSeconds(card.updateTime);
  }
}

export class BanListResponse {
  @ApiProperty({ type: BanResponse, isArray: true })
  list: BanResponse[];
  constructor(banCards: Card[]) {
    this.list = banCards.map((card) => new BanResponse(card));
  }
}
