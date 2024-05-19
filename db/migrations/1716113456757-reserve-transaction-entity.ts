import { MigrationInterface, QueryRunner } from "typeorm";

export class ReserveTransactionEntity1716113456757 implements MigrationInterface {
    name = 'ReserveTransactionEntity1716113456757'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`reserve_transaction\` (\`id\` varchar(36) NOT NULL, \`concertName\` varchar(255) NOT NULL, \`user_id\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`action\` varchar(255) NOT NULL, \`datetime\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`
        INSERT INTO reserve_transaction (id, concertName, user_id, username, action, datetime) 
        VALUES ('1','The festival Int 2024', '3b74d768-9330-428e-beeb-dd51b6da0beb' , 'Sara John', 'Reserve', '12/09/2024 10:39:20'),
        ('2','The festival Int 2024', '3b74d768-9330-428e-beeb-dd51b6da0beb', 'Sara John', 'Cancel', '12/09/2024 15:00:00')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`reserve_transaction\``);
    }

}
