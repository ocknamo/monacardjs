import { CounterpartyClientService } from './counterparty-client.service';

// Skip tests using actual API.
describe.skip('CounterpartyClientService', () => {
  let counterpartyClientService: CounterpartyClientService;
  beforeEach(() => {
    counterpartyClientService = new CounterpartyClientService();
  });

  describe('getAssetInfo', () => {
    it('should be get asset info', async () => {
      const result = await counterpartyClientService.getAssetInfo('MPCHAIN');

      console.log('LOG getAssetInfo→', result);
    });
  });

  describe('getBroadcast', () => {
    it('should be get broadcast', async () => {
      const result = await counterpartyClientService.getBroadcast(
        '6ae8a9bd6fb7a97a4ad1c5556bad152ff93c3c7650b0358e80a7d0460882bbc5',
      );
      console.log('LOG getBroadcast→', result);
    });
  });

  describe('getIssuances', () => {
    it('should get issuances', async () => {
      const result = await counterpartyClientService.getIssuances(2446815);

      console.log('LOG getIssuances→', result);
    });
  });

  describe('getIssuancesTxIndex', () => {
    it('should get issuances by TxIndex', async () => {
      const result = await counterpartyClientService.getIssuancesTxIndex(0);

      console.log('LOG getIssuances→', result);
    });
  });
});
