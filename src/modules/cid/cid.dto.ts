/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { CidInterface } from './cid.interface';

/**
 * Request
 */
export class CidRequest {
  @IsOptional()
  @Transform((p) => Number(p.value))
  @IsNumber()
  update_time?: number;
}

/**
 * Response
 */
export class CidResponse {
  cid: string;
  update_time: string;
  constructor(cid: string, updateTime: Date) {
    this.cid = cid;
    this.update_time = updateTime.getTime().toString();
  }
}

export class CidListResponse {
  list: CidResponse[];
  constructor(cids: CidInterface[]) {
    this.list = cids.map(
      (model) => new CidResponse(model.cid, model.updateTime!),
    );
  }
}
