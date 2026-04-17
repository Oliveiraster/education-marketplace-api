import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Address } from './address.entity';
import { UserStatus } from '../enum/userStatus.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true })
  role!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  whatsapp?: string;

  @Column({ nullable: true })
  photo?: string;

  @Column({ nullable: true })
  status!: UserStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @OneToMany(() => Address, (address) => address.user)
  addresses!: Address[];
}
