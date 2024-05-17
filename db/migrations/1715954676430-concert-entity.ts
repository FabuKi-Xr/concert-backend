import { MigrationInterface, QueryRunner } from "typeorm";

export class ConcertEntity1715954676430 implements MigrationInterface {
    name = 'ConcertEntity1715954676430'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`concert\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`seats\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`
        INSERT INTO concert (id, name, description, seats) 
        VALUES ('1', 'Concert 1', 'Lorem ipsum dolor sit amet consectetur. 
          Elit purus nam gravida porttitor nibh urna sit ornare a. 
          Proin dolor morbi id ornare aenean non. 
          Fusce dignissim turpis sed non est orci sed in. 
          Blandit ut purus nunc sed donec commodo morbi diam scelerisque.', 100)`);
        await queryRunner.query(`
        INSERT INTO concert (id, name, description, seats) 
        VALUES ('2', 'Concert 2', 'Lorem ipsum dolor sit amet consectetur. 
        Elit purus nam gravida porttitor nibh urna sit ornare a.', 100)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`concert\``);
    }

}
