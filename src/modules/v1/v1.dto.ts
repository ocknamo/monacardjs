/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { dateToUnixTimeSeconds, escapeHtml } from '@monacardjs/lib';
import { Card } from 'src/entity';

// TODO: OPEN API

/**
 * Request
 */
export class CardDetailsRequest {
  @IsOptional()
  @IsString()
  assets?: string;

  @IsOptional()
  @IsString()
  tag?: string;

  @IsOptional()
  @Transform((p) => Number(p.value))
  @IsNumber()
  update_time?: number;
}

/**
 * Response
 */

export class CardListResponse {
  list: string[];
  constructor(cards: string[]) {
    this.list = cards;
  }
}

export class CardDetailResponse {
  id: string;
  asset_common_name: string;
  asset: string;
  asset_longname: string | null;
  assetgroup: string | null;
  card_name: string;
  owner_name: string;
  imgur_url: string;
  add_description: string;
  tw_id: string;
  tw_name: string;
  tag: string;
  cid: string;
  ver: string;
  is_good_status: boolean;
  regist_time: string;
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
    this.tw_id = ''; // 未実装
    this.tw_name = ''; // 未実装
    this.tag = escapeHtml(card.tag);
    this.cid = escapeHtml(card.cid);
    this.ver = escapeHtml(card.ver.toString());
    this.is_good_status = card.status === 'ok';
    this.regist_time = dateToUnixTimeSeconds(card.registTime);
    this.update_time = dateToUnixTimeSeconds(card.updateTime);
  }
}

export class CardDetailsResponse {
  details: CardDetailResponse[];
  constructor(cards: Card[]) {
    this.details = cards.map((c) => new CardDetailResponse(c));
  }
}

export class BanResponse {
  asset: string;
  status: string;
  update_time: string;
  constructor(card: Card) {
    this.asset = card.asset;
    this.status = card.status;
    this.update_time = dateToUnixTimeSeconds(card.updateTime);
  }
}

export class BanListResponse {
  list: BanResponse[];
  constructor(banCards: Card[]) {
    this.list = banCards.map((card) => new BanResponse(card));
  }
}
