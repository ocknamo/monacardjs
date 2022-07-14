import { Card } from '../../../entity';

export const getMockCard = (suffix: string) =>
  new Card(
    `asset_${suffix}`,
    `assetLongname_${suffix}`,
    `assetGroup_${suffix}`,
    `name_${suffix}`,
    `issuer_${suffix}`,
    `imgur_${suffix}`,
    `description_${suffix}`,
    `status_${suffix}`,
    `tag_${suffix}`,
    `cid_${suffix}`,
    `ver_${suffix}`,
    `txHash_${suffix}`,
    9999,
  );
