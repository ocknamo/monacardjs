import { Logger } from '@nestjs/common';
import { Description } from '../index';

export function parseDescription(text: string): Description | undefined {
  const logger = new Logger('parseDescription');
  let json: object | undefined = undefined;
  try {
    json = JSON.parse(text);
  } catch (error) {
    logger.warn(`Source text is invalid. I cant parse to json. text: ${text}`);
    return undefined;
  }

  if (!json || !json['monacard']) {
    return undefined;
  }

  const desc = json['monacard'];

  return {
    identifier: 'monacard',
    cardName: desc['name'] ?? '',
    ownerName: desc['owner'] ?? '',
    addDescription: desc['desc'] ?? '',
    tag: desc['tag'] ?? '',
    cid: desc['cid'] ?? '',
    ver: desc['ver'] ?? '',
  };
}
