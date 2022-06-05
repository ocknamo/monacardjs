export class CidResponse {
  cid: string;
  update_time: string;
  constructor(cid: string, updateTime: number) {
    this.cid = cid;
    this.update_time = updateTime.toString();
  }
}

export class CidListResponse {
  list: CidResponse[];
  constructor(cids: CidResponse[]) {
    this.list = cids;
  }
}
