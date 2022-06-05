export * from './api';
export * from './utils';

/**
 * monacard2 description
 */
export interface Description {
  identifier: 'monacard';
  cardName: string;
  ownerName: string;
  addDescription: string;
  tag: string;
  cid: string;
  ver: string;
}
