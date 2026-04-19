import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { User } from './user.entity';

@Entity('user_tokens')
export class UserToken {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  token!: string;

  @Column()
  type!: string;

  @Column()
  expiresAt!: Date;

  @ManyToOne(() => User)
  user!: User;
}
