import { MigrationInterface, QueryRunner } from "typeorm";

export class AuthUser1737510665731 implements MigrationInterface {
    name = 'AuthUser1737510665731'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."auth_entity_role_enum" AS ENUM('MASTER', 'ADMIN')`);
        await queryRunner.query(`CREATE TABLE "auth_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "full_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."auth_entity_role_enum" NOT NULL DEFAULT 'ADMIN', CONSTRAINT "PK_d3d458da474344a6982aec36b5b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('MASTER', 'ADMIN')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "role" "public"."user_role_enum" NOT NULL DEFAULT 'ADMIN'`);
        await queryRunner.query(`DROP TABLE "auth_entity"`);
        await queryRunner.query(`DROP TYPE "public"."auth_entity_role_enum"`);
    }

}
