import { ArgumentsHost, HttpException } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';

describe('HttpExceptionFilter', () => {
  let service: HttpExceptionFilter;
  // beforeAll(() => {})
  beforeEach(() => {
    service = new HttpExceptionFilter();
  });
  // afterAll(() => {})
  // afterEach(() => {})
  it('should be exist', () => {
    expect(service).toBeDefined();
  });

  it('should set response', () => {
    const mockJsonMethod = jest.fn();
    const mockStatusMethod = jest
      .fn()
      .mockReturnValue({ json: mockJsonMethod });
    const mockResponseObj = {
      status: mockStatusMethod,
    };

    const getRequest = jest.fn().mockReturnValueOnce({});
    const getResponse = jest.fn().mockReturnValueOnce(mockResponseObj);
    const exception = new HttpException('example message', 404);
    const host: ArgumentsHost = {
      switchToHttp: () => ({ getRequest, getResponse } as any),
    } as any;

    service.catch(exception, host);

    expect(mockStatusMethod).toHaveBeenCalledWith(404);
    expect(mockJsonMethod).toHaveBeenCalledWith({
      statusCode: 404,
      error: { message: 'example message' },
    });
  });
});
