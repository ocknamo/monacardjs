import {
  CounterpartyClientService,
  headers,
  id,
  jsonrpc,
} from './counterparty-client.service';
import { AxiosStatic } from 'axios';

describe('CounterpartyClientService', () => {
  let counterpartyClientService: CounterpartyClientService;
  const mockAxios = {} as AxiosStatic;

  beforeEach(() => {
    counterpartyClientService = new CounterpartyClientService(
      'api_url',
      mockAxios,
    );
    // mocking
    mockAxios.post = jest
      .fn()
      .mockResolvedValueOnce({ data: { result: ['mock response'] } });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getAssetInfo', () => {
    it('should be get asset info', async () => {
      const result = await counterpartyClientService.getAssetInfo('MPCHAIN');

      expect(result).toBe('mock response');

      expect(mockAxios.post).toHaveBeenCalledWith(
        'api_url',
        {
          jsonrpc,
          id,
          method: 'get_assets_info',
          params: {
            assetsList: ['MPCHAIN'],
          },
        },
        { headers },
      );
    });
  });

  describe('getAssetInfos', () => {
    it('should be get asset infos', async () => {
      const result = await counterpartyClientService.getAssetInfos([
        'MPCHAIN',
        'OTHER',
      ]);

      expect(result).toEqual(['mock response']);

      expect(mockAxios.post).toHaveBeenCalledWith(
        'api_url',
        {
          jsonrpc,
          id,
          method: 'get_assets_info',
          params: {
            assetsList: ['MPCHAIN', 'OTHER'],
          },
        },
        { headers },
      );
    });
  });

  describe('getBroadcast', () => {
    it('should be get broadcast', async () => {
      const result = await counterpartyClientService.getBroadcast(
        '6ae8a9bd6fb7a97a4ad1c5556bad152ff93c3c7650b0358e80a7d0460882bbc5',
      );

      expect(result).toBe('mock response');
      expect(mockAxios.post).toHaveBeenCalledWith(
        'api_url',
        {
          jsonrpc,
          id,
          method: 'proxy_to_counterpartyd',
          params: {
            method: 'get_broadcasts',
            params: {
              filters: {
                field: 'tx_hash',
                op: '==',
                value:
                  '6ae8a9bd6fb7a97a4ad1c5556bad152ff93c3c7650b0358e80a7d0460882bbc5',
              },
            },
          },
        },
        { headers },
      );
    });
  });

  describe('getIssuances', () => {
    it('should get issuances', async () => {
      const result = await counterpartyClientService.getIssuances(2446815);

      expect(result).toEqual(['mock response']);
      expect(mockAxios.post).toHaveBeenCalledWith(
        'api_url',
        {
          jsonrpc,
          id,
          method: 'proxy_to_counterpartyd',
          params: {
            method: 'get_issuances',
            params: {
              filters: [
                { field: 'block_index', op: '>=', value: 2446815 },
                { field: 'description', op: 'LIKE', value: '%monacard%' },
              ],
              order_by: 'tx_index',
              order_dir: 'ASC',
            },
          },
        },
        { headers },
      );
    });
  });

  describe('getIssuancesTxIndex', () => {
    it('should get issuances by TxIndex', async () => {
      const result = await counterpartyClientService.getIssuancesTxIndex(0);

      expect(result).toEqual(['mock response']);

      expect(mockAxios.post).toHaveBeenCalledWith(
        'api_url',
        {
          jsonrpc,
          id,
          method: 'proxy_to_counterpartyd',
          params: {
            method: 'get_issuances',
            params: {
              filters: [
                { field: 'tx_index', op: '>', value: 0 },
                { field: 'description', op: 'LIKE', value: '%monacard%' },
              ],
              order_by: 'tx_index',
              order_dir: 'ASC',
            },
          },
        },
        { headers },
      );
    });
  });
});
