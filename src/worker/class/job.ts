import { CounterpartyClientService } from '@monacardjs/lib';
import { parseDescription } from '@monacardjs/lib';
import { Card } from '../../entity';
import { Connection } from 'typeorm';
import { Database } from './database';
import { Logger } from '@nestjs/common';

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

    try {
      const result = await connect.query(
        'select max(txIndex) as lastTxIndex from card',
      );

      const { lastTxIndex } = result[0];

      this.logger.log(`[readNewMonacard] lastTxIndex is ${lastTxIndex}`);

      const counterpartyApiUrl = process.env.COUNTERPARTY_API_URL;

      const api =
        this.cpApi || new CounterpartyClientService(counterpartyApiUrl);
      const issuances = await api.getIssuancesTxIndex(lastTxIndex ?? 0);

      const cards = issuances
        .map((i) => {
          const desc = parseDescription(i.description);

          if (2000 < (desc?.addDescription.length || 0)) {
            this.logger.log(
              `[readNewMonacard] Over 2000 description. asset: `,
              i.asset,
            );
          }

          return desc
            ? new Card(
                i.asset,
                i.asset_longname ?? null,
                i.asset_group ?? null,
                desc.cardName,
                i.issuer,
                '',
                desc.addDescription,
                i.status,
                desc.tag,
                desc.cid,
                desc.ver,
                i.tx_hash,
                i.tx_index,
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
    } catch (error) {
      throw error;
    }
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
      console.info('[syncBanCardList] Settings not to sync');
      return;
    }
    return;
  }
}
