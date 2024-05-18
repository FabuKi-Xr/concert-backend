import { MigrationInterface, QueryRunner } from "typeorm";

export class ReserveTransaction1716050427935 implements MigrationInterface {
    name = 'ReserveTransaction1716050427935'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`reserve_transaction\` (\`id\` varchar(36) NOT NULL, \`concertName\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`action\` varchar(255) NOT NULL, \`datetime\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`
        INSERT INTO reserve_transaction (id, concertName, username, action, datetime) 
        VALUES ('1','The festival Int 2024' , 'Sara John', 'Reserve', '12/09/2024 10:39:20'),
        ('2','The festival Int 2024', 'Sara John', 'Cancel', '12/09/2024 15:00:00')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`reserve_transaction\``);
    }

}
