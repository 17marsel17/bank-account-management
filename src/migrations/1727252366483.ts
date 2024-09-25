import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1727252366483 implements MigrationInterface {
  name = ' $npmConfigName1727252366483';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transaction" ALTER COLUMN "transaction_date" SET DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transaction" ALTER COLUMN "transaction_date" DROP DEFAULT`,
    );
  }
}
