import { Injectable } from '@nestjs/common';

@Injectable()
export class CidService {
  findAllCids(): { cid: string; updateTime: number }[] {
    console.log('LOG→ run find all cid names');
    return [{ cid: 'CID', updateTime: 99999999999 }];
  }
}
