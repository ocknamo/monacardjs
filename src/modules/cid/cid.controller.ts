import { Controller, Get, Query } from '@nestjs/common';
import { v1RootPath } from 'src/path';
import { CidListResponse, CidRequest } from './cid.dto';
import { CidService } from './cid.service';

@Controller(v1RootPath)
export class CidController {
  constructor(private cidService: CidService) {}
  @Get('/cid_list')
  async findAllNames(@Query() query: CidRequest): Promise<CidListResponse> {
    return new CidListResponse(await this.cidService.findAllCids(query));
  }
}
