import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Action } from '../.types';

@Entity()
export class ReserveTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  concertName: string;

  @Column('uuid', { name: 'user_id' })
  userId: string;

  @Column()
  username: string;

  @Column()
  action: Action;

  @Column()
  datetime: string;
}
