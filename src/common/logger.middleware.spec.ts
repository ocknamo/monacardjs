import { LoggerMiddleware } from './logger.middleware';

describe('LoggerMiddleware', () => {
  const mockReqObj = {
    headers: { 'user-agent': 'user_agent' },
  };
  let service: LoggerMiddleware;

  beforeEach(() => {
    service = new LoggerMiddleware();
  });

  it('should set uuid as requestId into request object', () => {
    const reqObj: any = { ...mockReqObj };
    const resObj: any = {};
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    service.use(reqObj, resObj, () => {});

    expect(reqObj['requestId']).toBeDefined();
    expect(typeof reqObj['requestId']).toBe('string');
    expect(reqObj['requestId']).toHaveLength(36);
  });

  it('should not set uuid as requestId into request object if already exist', () => {
    const reqObj: any = { ...mockReqObj, requestId: 'request_id' };
    const resObj: any = {};
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    service.use(reqObj, resObj, () => {});

    expect(reqObj['requestId']).toBe('request_id');
  });

  it('should call next function finally.', () => {
    const reqObj: any = { ...mockReqObj };
    const resObj: any = {};
    const nextFunction = jest.fn();
    service.use(reqObj, resObj, nextFunction);

    expect(nextFunction).toHaveBeenCalled();
  });
});
