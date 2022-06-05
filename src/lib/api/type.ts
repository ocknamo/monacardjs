/**
 * Response Type
 */

export interface JsonRpcResponseBase<T> {
  jsonrpc: string;
  id: number;
  result: T;
}

export interface AssetInfo {
  locked: boolean;
  owner: string;
  assetgroup: string | null;
  description: string;
  divisible: boolean;
  reassignable: boolean;
  supply: number;
  fungible: boolean;
  asset: string;
  issuer: string;
  asset_longname: string | null;
  listed: boolean;
  vendable: boolean;
}

export interface Broadcast {
  block_index: number;
  fee_fraction_int: number;
  status: string;
  timestamp: number;
  source: string;
  text: string;
  tx_hash: string;
  locked: number;
  value: number;
  tx_index: number;
}

export interface Issuance {
  reassignable: number;
  fee_paid: number;
  tx_index: number;
  call_date: number;
  status: string;
  source: string;
  issuer: string;
  asset: string;
  listed: number;
  tx_hash: string;
  vendable: number;
  locked: number;
  quantity: number;
  msg_index: number;
  description: string;
  divisible: number;
  transfer: number;
  fungible: number;
  callable: number;
  block_index: number;
  call_price: number;
  asset_longname?: string;
  asset_group?: string;
}
