import {MigrationInterface, QueryRunner} from "typeorm";

export class DDL1651913915247 implements MigrationInterface {
    name = 'DDL1651913915247'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`card\` (\`id\` int NOT NULL AUTO_INCREMENT, \`asset\` varchar(255) NULL, \`assetLongname\` varchar(255) NULL, \`assetGroup\` varchar(255) NULL, \`name\` varchar(255) NULL, \`issuer\` varchar(255) NULL, \`imgur\` varchar(255) NULL, \`description\` varchar(2000) NULL, \`status\` varchar(100) NOT NULL DEFAULT 'good', \`tag\` varchar(255) NOT NULL DEFAULT '', \`cid\` varchar(255) NOT NULL, \`ver\` varchar(255) NOT NULL DEFAULT '1', \`txHash\` varchar(255) NOT NULL COMMENT '登録時のissuanceのtxハッシュ', \`txIndex\` bigint NULL COMMENT '登録時のtx index', \`registTime\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateTime\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_9462af55721068a9e0eb47aa72\` (\`asset\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_9462af55721068a9e0eb47aa72\` ON \`card\``);
        await queryRunner.query(`DROP TABLE \`card\``);
    }

}
