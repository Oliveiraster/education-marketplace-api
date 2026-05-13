import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './user.entity';

@Entity()
export class About {
  @PrimaryGeneratedColumn()
  id!: string;

  @OneToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn()
  user!: User;

  @Column({ type: 'text', nullable: true })
  bio?: string;

  @Column({ type: 'json', nullable: true })
  skills?: string[];

  @Column({ type: 'varchar', nullable: true })
  role?: string;

  @Column({ type: 'varchar', nullable: true })
  objective?: string;
}
