import { Card } from '../../../entity';

export const getMockCard = (suffix: string) =>
  new Card(
    `asset${suffix}`,
    `assetLongname${suffix}`,
    `assetGroup${suffix}`,
    `name${suffix}`,
    `issuer${suffix}`,
    `imgur${suffix}`,
    `description${suffix}`,
    `tag${suffix}`,
    `cid${suffix}`,
    `ver${suffix}`,
    `txHash${suffix}`,
    9999,
  );
