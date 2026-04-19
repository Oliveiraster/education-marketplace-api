import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';

import { Address } from './address.entity';
import { UserType } from '../../../../auth/enum/userType.enum';
import { UserStatus } from '../enum/userStatus.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ type: 'text', default: UserType.USER })
  role!: UserType;

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

  @CreateDateColumn()
  createdAt?: Date;

  @OneToMany(() => Address, (address) => address.user)
  addresses!: Address[];
}
