import {MigrationInterface, QueryRunner} from "typeorm";

export class DDL1653831534213 implements MigrationInterface {
    name = 'DDL1653831534213'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`card\` ADD \`description\` varchar(6000) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`card\` ADD \`description\` varchar(2000) NULL`);
    }

}
