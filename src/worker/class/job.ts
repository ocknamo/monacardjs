import { CounterpartyClientService } from 'monacardjs/api';
import { parseDescription } from 'monacardjs/utils';
import { Card } from '../../entity';
import { Connection } from 'typeorm';
import { Database } from './database';

export class Job {
  private _connection: Promise<Connection>;

  constructor(connection?: Promise<Connection>) {
    if (connection) {
      this._connection = connection;
    } else {
      const db = new Database();
      this._connection = db.getConnection();
    }
  }

  async readNewMonacard(): Promise<void> {
    const connection = await this._connection;

    try {
      const result = await connection.query(
        'select max(txIndex) as lastTxIndex from card',
      );

      const { lastTxIndex } = result[0];

      console.log('[readNewMonacard] lastTxIndex is ', lastTxIndex);

      const api = new CounterpartyClientService();
      const issuances = await api.getIssuancesTxIndex(lastTxIndex ?? 0);

      const cards = issuances
        .map((i) => {
          const desc = parseDescription(i.description);

          if (2000 < (desc?.addDescription.length || 0)) {
            console.log(`[readNewMonacard] Over 2000 description.`);
            console.log(`[readNewMonacard] Asset`, i.asset);
            console.log(
              `[readNewMonacard] addDescription`,
              desc?.addDescription,
            );
            console.log(
              `[readNewMonacard] addDescription length`,
              desc?.addDescription.length,
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
      await connection
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
}
