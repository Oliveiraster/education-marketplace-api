import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ManyToOne } from 'typeorm';

import { User } from './user.entity';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  city!: string;

  @Column()
  state!: string;

  @ManyToOne(() => User, (user) => user.addresses)
  user!: User;
}
