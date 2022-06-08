/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
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
    this.card_name = card.name!;
    this.owner_name = card.issuer!;
    this.imgur_url = card.imgur ?? '';
    this.add_description = card.description ?? '';
    this.tw_id = ''; // 未実装
    this.tw_name = ''; // 未実装
    this.tag = card.tag;
    this.cid = card.cid;
    this.ver = card.ver.toString();
    this.is_good_status = card.status === 'ok';
    this.regist_time = card.registTime!.getTime().toString();
    this.update_time = card.updateTime!.getTime().toString();
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
  constructor(asset: string, status: string, updateTime: string) {
    this.asset = asset;
    this.status = status;
    this.update_time = updateTime;
  }
}

export class BanListResponse {
  list: BanResponse[];
  constructor(banlist: BanResponse[]) {
    this.list = banlist;
  }
}
