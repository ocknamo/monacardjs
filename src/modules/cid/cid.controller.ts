import { Controller, Get } from '@nestjs/common';
import { v1RootPath } from 'src/path';
import { CidResponse } from '.';
import { CidListResponse } from './cid.dto';
import { CidService } from './cid.service';

@Controller(v1RootPath)
export class CidController {
  constructor(private cidService: CidService) {}
  @Get('/cid_list')
  async findAllNames(): Promise<CidListResponse> {
    return new CidListResponse(
      this.cidService
        .findAllCids()
        .map((res) => new CidResponse(res.cid, res.updateTime)),
    );
  }
}
