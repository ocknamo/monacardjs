# API

## GET /api/health

ヘルスチェック

```
// Success response
114514
```

## GET /api/v1/card_list

カード化トークン名一覧取得。

```json
// example
// response
{"list": ["KUMAXAICON","NFTCHAN.a03","A8626940138775990225"]}
```


## GET /api/vi/card_detail

### Card Detail

#### id

他のサーバーと同一にならない場合があります。

#### asset_common_name

一般的なトークン名(UNAGI, UNAGI.AFTERなど)

#### asset

Counterblock apiで使う識別子。親トークンならasset_common_nameと同じ、子トークンの場合は「A10770391013707819263」のような文字列

#### asset_longname

子トークン名 (親トークンの場合はnull)

#### assetgroup

TrueNFTのグループ名 (TrueNFTでない場合はnull)

#### card_name

カード名

#### owner_name

登録者名

#### imgur_url

imgurまたはmonappyの画像URL

#### add_description

カードの説明

#### tw_id

登録者Twitterの固有ID

#### tw_name

登録者Twitter名

#### tag

タグ情報(カンマ区切り)

#### cid

IPFSのCID

#### ver

"1"または"2"。1は従来のMonacard, 2はMonacard2.0。

#### is_good_status

規約に違反している場合「false」, 問題ない場合は「true」

#### regist_time

情報の登録日。このサーバーが初めてデータを取得した日時のため他のサーバーとは異なります。

#### update_time

情報の更新日。このサーバーがデータを取得した日時のため他のサーバーとは異なります。

## POST /api/vi/card_detail_post

上記の詳細情報取得APIのPOST版です。URLが長くなりすぎるような場合は、ブラウザなどの仕様で取得に失敗するのでこちらをご利用ください。基本的な仕様はGETと同じです。

URL: /api/v1/card_detail_post
key: assets, tag, update_timeの中から選択
value: GETの仕様と同じ

## /api/cid_list

IPFSのCID一覧。
IPFSのファイルをPINしていただける場合基本的にこのAPIを使ってください。上記の「カード詳細情報取得API」の場合余計な情報も入りますがCIDの項目があるので使えます。

``` bash
// example
/api/v1/cid_list?update_time=時間(指定したUnixtime以降に更新されたカードの情報)
```

## /api/v1/ban_list

- asset: 他のサーバーと同一にならない場合があります。
- status: BANされた原因
- update_time: カード情報が最後に更新された時刻(unixtime)

```
// example

{"list":[{"asset":"DOGEMUSK","status":"publicity","update_time":"1644513843"},{"asset":"A14052136361691365270","status":"ban","update_time":"1638287861"},{"asset":"GIFPRAC","status":"copyright","update_time":"1638263338"},{"asset":"A18430995401059432457","status":"delete","update_time":"1623401187"}]}
```

## error

```typescript
{
  statusCode: number,
  error: { message: string }
}
```
