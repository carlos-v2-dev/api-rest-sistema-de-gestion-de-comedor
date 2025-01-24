import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrationinit1737388633466 implements MigrationInterface {
    name = 'Migrationinit1737388633466'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stock" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "input_quantity" integer NOT NULL, "output_quantity" integer NOT NULL DEFAULT '0', "product" character varying NOT NULL, CONSTRAINT "PK_092bc1fc7d860426a1dec5aa8e9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_gender_enum" AS ENUM('M', 'F')`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('MASTER', 'ADMIN')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "name" character varying NOT NULL, "dni" character varying NOT NULL, "age" integer NOT NULL, "gender" "public"."user_gender_enum" NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "photo" character varying, "role" "public"."user_role_enum" NOT NULL DEFAULT 'ADMIN', CONSTRAINT "UQ_027941f32603b418d9bf0db0e82" UNIQUE ("dni"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "departament" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_421574e32347465bd3d720c55cf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "service" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "description" character varying, "departament_id" uuid, CONSTRAINT "PK_85a21558c006647cd76fdce044b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "service" ADD CONSTRAINT "FK_c0b07a6c4cf6a3792091039e313" FOREIGN KEY ("departament_id") REFERENCES "departament"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service" DROP CONSTRAINT "FK_c0b07a6c4cf6a3792091039e313"`);
        await queryRunner.query(`DROP TABLE "service"`);
        await queryRunner.query(`DROP TABLE "departament"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_gender_enum"`);
        await queryRunner.query(`DROP TABLE "stock"`);
    }

}
