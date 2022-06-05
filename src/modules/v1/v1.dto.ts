import { CardDetail } from './v1.interface';

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
  asset_longname: string;
  assetgroup: string;
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
  constructor(detail: CardDetail) {
    this.id = detail.id;
    this.asset_common_name = detail.assetCommonName;
    this.asset = detail.asset;
    this.asset_longname = detail.assetLongname;
    this.assetgroup = detail.assetgroup;
    this.card_name = detail.cardName;
    this.owner_name = detail.ownerName;
    this.imgur_url = detail.imgurUrl;
    this.add_description = detail.addDescription;
    this.tw_id = detail.twId;
    this.tw_name = detail.twName;
    this.tag = detail.tag;
    this.cid = detail.cid;
    this.ver = detail.ver.toString();
    this.is_good_status = detail.isGoodStatus;
    this.regist_time = detail.registTime.toString();
    this.update_time = detail.updateTime.toString();
  }
}

export class CardDetailsResponse {
  details: CardDetailResponse[];
  constructor(details: CardDetail[]) {
    this.details = details.map((d) => new CardDetailResponse(d));
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
