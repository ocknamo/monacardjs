import axios from 'axios';
import { AssetInfo, Broadcast, Issuance, JsonRpcResponseBase } from './type';

export const jsonrpc = '2.0';
export const id = 0;
export const headers = { 'content-type': 'application/json' };

export class CounterpartyClientService {
  constructor(
    private readonly url,
    private readonly api: typeof axios = axios,
  ) {}
  async getAssetInfo(assetName: string): Promise<AssetInfo> {
    const { result } = await this.readApi<JsonRpcResponseBase<AssetInfo[]>>(
      'get_assets_info',
      {
        assetsList: [assetName],
      },
    );

    return result[0];
  }

  async getBroadcast(txHash: string): Promise<Broadcast> {
    const { result } = await this.readProxyApi<
      JsonRpcResponseBase<Broadcast[]>
    >('get_broadcasts', {
      filters: { field: 'tx_hash', op: '==', value: txHash },
    });

    return result[0];
  }

  async getIssuances(startBlockIndex: number): Promise<Issuance[]> {
    const { result } = await this.readProxyApi<JsonRpcResponseBase<Issuance[]>>(
      'get_issuances',
      {
        filters: [
          { field: 'block_index', op: '>=', value: startBlockIndex },
          { field: 'description', op: 'LIKE', value: '%monacard%' },
        ],
        order_by: 'tx_index',
        order_dir: 'ASC',
      },
    );

    return result;
  }

  async getIssuancesTxIndex(lastTxIndex: number): Promise<Issuance[]> {
    const { result } = await this.readProxyApi<JsonRpcResponseBase<Issuance[]>>(
      'get_issuances',
      {
        filters: [
          { field: 'tx_index', op: '>', value: lastTxIndex },
          { field: 'description', op: 'LIKE', value: '%monacard%' },
        ],
        order_by: 'tx_index',
        order_dir: 'ASC',
      },
    );

    return result;
  }

  private async readProxyApi<T>(method: string, parameter: object): Promise<T> {
    const data = {
      jsonrpc,
      id,
      method: 'proxy_to_counterpartyd',
      params: { method, params: parameter },
    };

    return await this.readBase<T>(data);
  }

  private async readApi<T>(method: string, parameter: object): Promise<T> {
    const data = { jsonrpc, id, method, params: parameter };

    return await this.readBase<T>(data);
  }

  private async readBase<T>(data: object): Promise<T> {
    if (!this.url) {
      throw new Error(`Invalid counterparty Api Url. url ${this.url}`);
    }
    try {
      const response = await this.api.post<T>(this.url, data, {
        headers,
      });

      return response.data;
    } catch (error) {
      console.warn(
        'Monaparty apiとの接続に失敗しました。APIサーバーが復旧するまで長い時間がかかる可能性があります。',
      );
      throw error;
    }
  }
}
