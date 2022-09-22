import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CidListResponse, CidRequest, CidResponse } from './cid.dto';
import { CidInterface } from './cid.interface';

describe('cid.dto.ts', () => {
  describe('Request', () => {
    it('should get CidRequest', () => {
      let cidRequest = plainToInstance(CidRequest, { update_time: '12345' });
      expect(cidRequest.update_time).toBe(12345);

      cidRequest = plainToInstance(CidRequest, { update_time: '0' });
      expect(cidRequest.update_time).toBe(0);

      cidRequest = plainToInstance(CidRequest, {});
      expect(cidRequest.update_time).toBeUndefined();
    });

    it('should be occurred validation error if update_time is not a numeric string.', async () => {
      const cidRequest = plainToInstance(CidRequest, {
        update_time: 'not_number',
      });

      const errors = await validate(cidRequest);
      expect(errors).toHaveLength(1);
      expect(errors[0].target).toEqual({ update_time: NaN });
      expect(errors[0].value).toBeNaN();
      expect(errors[0].property).toBe('update_time');
      expect(errors[0].constraints).toEqual({
        isNumber:
          'update_time must be a number conforming to the specified constraints',
      });
    });
  });

  describe('Response', () => {
    const date1 = new Date(Date.UTC(96, 1, 2, 3, 4, 5)); // 823230245
    const date2 = new Date(Date.UTC(2022, 1, 2, 3, 4, 5)); // 1643771045

    it('should get CidResponse', () => {
      const cidResponse1 = new CidResponse('cid1', date1);
      expect(cidResponse1).toEqual({
        cid: 'cid1',
        update_time: '823230245',
      });

      const cidResponse2 = new CidResponse('cid2', date2);
      expect(cidResponse2).toEqual({
        cid: 'cid2',
        update_time: '1643771045',
      });
    });

    it('should get CidListResponse', () => {
      const cids: CidInterface[] = [
        {
          cid: 'cid1',
          updateTime: date1,
        },
        {
          cid: 'cid2',
          updateTime: date2,
        },
      ];

      const cidList = new CidListResponse(cids);

      expect(cidList.list).toHaveLength(2);
      expect(cidList.list[0]).toEqual({
        cid: 'cid1',
        update_time: '823230245',
      });
      expect(cidList.list[1]).toEqual({
        cid: 'cid2',
        update_time: '1643771045',
      });
    });
  });
});
