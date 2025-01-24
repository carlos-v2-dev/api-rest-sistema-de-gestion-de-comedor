import { MigrationInterface, QueryRunner } from "typeorm";

export class UserRelations1737691216757 implements MigrationInterface {
    name = 'UserRelations1737691216757'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service" ADD "User_id" uuid`);
        await queryRunner.query(`ALTER TABLE "service" ADD CONSTRAINT "FK_1962c01770a8c081c0766bfae54" FOREIGN KEY ("User_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service" DROP CONSTRAINT "FK_1962c01770a8c081c0766bfae54"`);
        await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "User_id"`);
    }

}
