import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface ConcertCreateRequest {
  name: string;
  description: string;
  seats: number;
}

export interface ConcertData extends ConcertCreateRequest {
  id: string;
}

@Entity()
export class Concert {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  seats: number;
}
