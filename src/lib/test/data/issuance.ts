import { Issuance } from 'monacardjs/api';

const mockDescription = {
  monacard: {
    name: 'MONACARD20',
    owner: 'モナカード公式',
    desc: 'このカードは新しい方式で登録されました。',
    tag: '公式test,2.0',
    cid: 'bafkrmibgvyv6gr4rgnscfffllralzdh3fcfsqoqawcmfnlu4heel3rwu4i',
    ver: '2',
  },
};

export const mockIssuance: Issuance = {
  reassignable: 0,
  fee_paid: 100,
  tx_index: 9999,
  call_date: 99999,
  status: 'status',
  source: 'source',
  issuer: 'issuer',
  asset: 'asset',
  listed: 1,
  tx_hash: 'tx_hash',
  vendable: 0,
  locked: 0,
  quantity: 100,
  msg_index: 3,
  description: JSON.stringify(mockDescription),
  divisible: 1,
  transfer: 1,
  fungible: 1,
  callable: 0,
  block_index: 114514,
  call_price: 11111,
  asset_longname: 'asset_longname',
  asset_group: 'asset_group',
};
