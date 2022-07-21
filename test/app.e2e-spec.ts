import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    app.close();
  });

  describe('v1', () => {
    it('/api/v1/card_list (GET)', () => {
      return request(app.getHttpServer())
        .get('/api/v1/card_list')
        .expect(200)
        .expect({
          list: ['assetLongname_03', 'assetLongname_02', 'assetLongname_01'],
        });
    });

    it('/api/v1/card_detail (GET)', () => {
      return request(app.getHttpServer())
        .get('/api/v1/card_detail?assets=assetLongname_03')
        .expect(200)
        .expect({
          details: [
            {
              id: 3,
              asset_common_name: 'assetLongname_03',
              asset: 'asset_03',
              asset_longname: 'assetLongname_03',
              assetgroup: 'assetGroup_03',
              card_name: 'name_03',
              owner_name: 'issuer_03',
              imgur_url: 'imgur_03',
              add_description: 'description_03',
              tw_id: '',
              tw_name: '',
              tag: 'tag_03',
              cid: 'cid_03',
              ver: 'ver_03',
              is_good_status: false,
              regist_time: '1658074228952',
              update_time: '1658074228952',
            },
          ],
        });
    });

    it('/api/v1/card_detail (POST)', () => {
      return request(app.getHttpServer())
        .post('/api/v1/card_detail_post')
        .send({ assets: 'assetLongname_01' })
        .expect(200)
        .expect({
          details: [
            {
              id: 1,
              asset_common_name: 'assetLongname_01',
              asset: 'asset_01',
              asset_longname: 'assetLongname_01',
              assetgroup: 'assetGroup_01',
              card_name: 'name_01',
              owner_name: 'issuer_01',
              imgur_url: 'imgur_01',
              add_description: 'description_01',
              tw_id: '',
              tw_name: '',
              tag: 'tag_01',
              cid: 'cid_01',
              ver: 'ver_01',
              is_good_status: false,
              regist_time: '1658074228940',
              update_time: '1658074228940',
            },
          ],
        });
    });

    it('/api/v1/ban_list (GET)', () => {
      return request(app.getHttpServer())
        .get('/api/v1/ban_list')
        .expect(200)
        .expect({
          list: [
            {
              asset: 'asset_03',
              status: 'publicity',
              update_time: '1658074228952',
            },
            {
              asset: 'asset_01',
              status: 'copyright',
              update_time: '1658074228940',
            },
          ],
        });
    });
  });

  describe('cid', () => {
    it('/api/v1/cid_list', () => {
      return request(app.getHttpServer())
        .get('/api/v1/cid_list')
        .expect(200)
        .expect({
          list: [{ cid: 'cid_02', update_time: '1658074228948' }],
        });
    });
  });
});
