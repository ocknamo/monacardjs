import { Controller, Get, Header, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { KeyValue } from '../../common/type';
import { v1RootPath } from '../../path';
import { CidListResponse, CidRequest } from './cid.dto';
import { CidService } from './cid.service';

const header: KeyValue = {
  key: 'cache-control',
  value: 'max-age=60, stale-while-revalidate=180, must-revalidate',
};

@ApiTags('IPFS')
@Controller(v1RootPath)
export class CidController {
  constructor(private cidService: CidService) {}
  @Get('/cid_list')
  @Header(header.key, header.value)
  @ApiOkResponse({
    type: CidListResponse,
    description: 'List of CIDs for card images',
  })
  async findAllNames(@Query() query: CidRequest): Promise<CidListResponse> {
    return new CidListResponse(await this.cidService.findAllCids(query));
  }
}
