import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Concert {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  seats: number;
}
