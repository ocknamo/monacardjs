/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { dateToUnixTimeSeconds } from '@monacardjs/lib';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { CidInterface } from './cid.interface';

/**
 * Request
 */
export class CidRequest {
  @IsOptional()
  @Transform((p) => Number(p.value))
  @IsNumber({ allowNaN: false })
  update_time?: number;
}

/**
 * Response
 */
export class CidResponse {
  @ApiProperty()
  cid: string;

  @ApiProperty()
  update_time: string;
  constructor(cid: string, updateTime: Date) {
    this.cid = cid;
    this.update_time = dateToUnixTimeSeconds(updateTime);
  }
}

export class CidListResponse {
  @ApiProperty({ type: CidResponse, isArray: true })
  list: CidResponse[];
  constructor(cids: CidInterface[]) {
    this.list = cids.map(
      (model) => new CidResponse(model.cid, model.updateTime!),
    );
  }
}
