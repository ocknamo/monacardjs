import { CounterpartyClientService } from '@monacardjs/lib';
import { parseDescription } from '@monacardjs/lib';
import { Card } from '../../entity';
import { Connection } from 'typeorm';
import { Database } from './database';
import { Logger } from '@nestjs/common';
import axios from 'axios';
import { BanListResponse } from '../../modules/v1';

export class Job {
  private readonly logger = new Logger(Job.name);
  constructor(
    private connection?: Promise<Connection>,
    private cpApi?: CounterpartyClientService,
  ) {
    if (!connection) {
      const db = new Database();
      this.connection = db.getConnection();
    }
  }

  /**
   * Read new monacards and upsert its into database.
   * @async
   * @method
   * @name readNewMonacard
   * @kind method
   * @memberof Job
   * @returns {Promise<void>}
   */
  async readNewMonacard(): Promise<void> {
    if (!this.connection) {
      throw new Error('Invalid connection.');
    }
    const connect = await this.connection;

    const result = await connect.query(
      'select max(txIndex) as lastTxIndex from card',
    );

    const { lastTxIndex } = result[0];

    this.logger.log(`[readNewMonacard] lastTxIndex is ${lastTxIndex}`);

    const counterpartyApiUrl = process.env.COUNTERPARTY_API_URL;

    const api = this.cpApi || new CounterpartyClientService(counterpartyApiUrl);
    const issuances = await api.getIssuancesTxIndex(lastTxIndex ?? 0);
    const infos = await api.getAssetInfos(issuances.map((i) => i.asset));

    const cards = issuances
      .map((issuance) => {
        const info = infos.find((inf) => inf.asset === issuance.asset);
        const desc = parseDescription(issuance.description);

        if (2000 < (desc?.addDescription.length || 0)) {
          this.logger.log(
            `[readNewMonacard] Over 2000 description. asset: `,
            issuance.asset,
          );
        }

        return desc && info
          ? new Card(
              info.asset,
              info.asset_longname ?? null,
              info.assetgroup ?? null,
              desc.cardName,
              issuance.issuer,
              '',
              desc.addDescription,
              desc.tag,
              desc.cid,
              desc.ver,
              issuance.tx_hash,
              issuance.tx_index,
            )
          : undefined;
      })
      .filter((v) => v instanceof Card) as Card[];

    /**
     * Insert when entity has new `id` or `asset`.
     * In otherwise update entity.
     */
    await connect
      .createQueryBuilder()
      .insert()
      .into(Card)
      .values(cards)
      .orUpdate(
        [
          'assetLongname',
          'assetGroup',
          'name',
          'issuer',
          'imgur',
          'description',
          'status',
          'tag',
          'cid',
          'ver',
          'txHash',
          'txIndex',
          'registTime',
          'updateTime',
        ],
        ['id', 'asset'],
      )
      .execute();
  }

  /**
   * Fetch ban card list and sync status to ban.
   * Fetch from other monacard API url.
   * e.g. https://card.mona.jp/api/ban_list
   * @async
   * @method
   * @name syncBanCardList
   * @kind method
   * @memberof Job
   * @returns {Promise<void>}
   */
  async syncBanCardList(banlistUrl?: string): Promise<void> {
    if (!banlistUrl) {
      this.logger.log('[syncBanCardList] Settings not to sync');
      return;
    }
    if (!this.connection) {
      throw new Error('Invalid connection.');
    }
    const connect = await this.connection;

    const response = await axios.get<BanListResponse>(banlistUrl);
    if (!response.data) {
      throw new Error('Faid to connect API.');
    }

    const banList = response.data['list'];

    const validStatus = 'good';
    const banAssetList = banList.map((v) => v.asset);
    const cardRepository = connect.getRepository(Card);
    const qb = cardRepository.createQueryBuilder('card');
    qb.where('card.status=:status', { status: validStatus });
    qb.andWhere('card.asset IN (:...assetList)', { assetList: banAssetList });

    const targets = await qb.getMany();

    const updatedTargets: Card[] = [];
    targets.forEach((t) => {
      const banObj = banList.find((ban) => ban.asset === t.asset);
      if (!banObj) {
        return;
      }
      updatedTargets.push({ ...t, status: banObj.status });
    });

    await cardRepository.save(updatedTargets);

    return;
  }
}
