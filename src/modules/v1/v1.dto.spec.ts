import { getMockCard } from '@monacardjs/lib';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import {
  CardDetailResponse,
  CardDetailsRequest,
  CardDetailsResponse,
  CardListResponse,
} from './v1.dto';

describe('v1.dto.ts', () => {
  describe('Request', () => {
    it('should get CardDetailsRequest', () => {
      let cardDetailsRequest = plainToInstance(CardDetailsRequest, {});
      expect(cardDetailsRequest.assets).toBeUndefined();
      expect(cardDetailsRequest.tag).toBeUndefined();
      expect(cardDetailsRequest.update_time).toBeUndefined();

      cardDetailsRequest = plainToInstance(CardDetailsRequest, {
        assets: 'assets',
        tag: 'tag',
        update_time: '12345',
      });
      expect(cardDetailsRequest).toEqual({
        assets: 'assets',
        tag: 'tag',
        update_time: 12345,
      });
    });
    it('should be occurred validation error if assets is not a string.', async () => {
      const cardDetailsRequest = plainToInstance(CardDetailsRequest, {
        assets: true,
        tag: 'tag',
        update_time: '99999',
      });

      const errors = await validate(cardDetailsRequest);
      expect(errors).toHaveLength(1);
      expect(errors[0].target).toEqual({
        assets: true,
        tag: 'tag',
        update_time: 99999,
      });
      expect(errors[0].value).toBe(true);
      expect(errors[0].property).toBe('assets');
      expect(errors[0].constraints).toEqual({
        isString: 'assets must be a string',
      });
    });

    it('should be occurred validation error if tag is not a string.', async () => {
      const cardDetailsRequest = plainToInstance(CardDetailsRequest, {
        assets: 'assets',
        tag: 12345,
        update_time: '99999',
      });

      const errors = await validate(cardDetailsRequest);
      expect(errors).toHaveLength(1);
      expect(errors[0].target).toEqual({
        assets: 'assets',
        tag: 12345,
        update_time: 99999,
      });
      expect(errors[0].value).toBe(12345);
      expect(errors[0].property).toBe('tag');
      expect(errors[0].constraints).toEqual({
        isString: 'tag must be a string',
      });
    });

    it('should be occurred validation error if update_time is not a numeric string.', async () => {
      const cardDetailsRequest = plainToInstance(CardDetailsRequest, {
        assets: 'assets',
        tag: 'tag',
        update_time: 'not_number',
      });

      const errors = await validate(cardDetailsRequest);
      expect(errors).toHaveLength(1);
      expect(errors[0].target).toEqual({
        assets: 'assets',
        tag: 'tag',
        update_time: NaN,
      });
      expect(errors[0].value).toBeNaN();
      expect(errors[0].property).toBe('update_time');
      expect(errors[0].constraints).toEqual({
        isNumber:
          'update_time must be a number conforming to the specified constraints',
      });
    });
  });

  describe('Response', () => {
    it('should get CardListResponse', () => {
      const cardList = new CardListResponse(['card1', 'card2', 'card3']);
      expect(cardList).toEqual({ list: ['card1', 'card2', 'card3'] });
    });

    const date1 = new Date('2022-09-17T20:16:04.463Z');
    const date2 = new Date('2022-09-17T21:16:04.463Z');
    it('should get CardDetailResponse', () => {
      const cardDetail = new CardDetailResponse({
        ...getMockCard(''),
        id: 'id',
        registTime: date1,
        updateTime: date2,
      });
      expect(cardDetail).toEqual({
        id: 'id',
        asset_common_name: 'assetLongname',
        asset: 'asset',
        asset_longname: 'assetLongname',
        assetgroup: 'assetGroup',
        card_name: 'name',
        owner_name: 'issuer',
        imgur_url: 'imgur',
        add_description: 'description',
        tw_id: '',
        tw_name: '',
        tag: 'tag',
        cid: 'cid',
        ver: 'ver',
        is_good_status: true,
        regist_time: '1663445764',
        update_time: '1663449364',
      });
    });

    it('should get CardDetailsResponse', () => {
      const card1 = {
        ...getMockCard('1'),
        id: 'id1',
        registTime: date1,
        updateTime: date2,
      };
      const card2 = {
        ...getMockCard('2'),
        id: 'id2',
        registTime: date1,
        updateTime: date2,
      };

      const cardDetails = new CardDetailsResponse([card1, card2]);

      expect(cardDetails.details).toHaveLength(2);
      expect(cardDetails.details[0]).toEqual({
        id: 'id1',
        asset_common_name: 'assetLongname1',
        asset: 'asset1',
        asset_longname: 'assetLongname1',
        assetgroup: 'assetGroup1',
        card_name: 'name1',
        owner_name: 'issuer1',
        imgur_url: 'imgur1',
        add_description: 'description1',
        tw_id: '',
        tw_name: '',
        tag: 'tag1',
        cid: 'cid1',
        ver: 'ver1',
        is_good_status: true,
        regist_time: '1663445764',
        update_time: '1663449364',
      });

      expect(cardDetails.details[1]).toEqual({
        id: 'id2',
        asset_common_name: 'assetLongname2',
        asset: 'asset2',
        asset_longname: 'assetLongname2',
        assetgroup: 'assetGroup2',
        card_name: 'name2',
        owner_name: 'issuer2',
        imgur_url: 'imgur2',
        add_description: 'description2',
        tw_id: '',
        tw_name: '',
        tag: 'tag2',
        cid: 'cid2',
        ver: 'ver2',
        is_good_status: true,
        regist_time: '1663445764',
        update_time: '1663449364',
      });
    });
  });
});
