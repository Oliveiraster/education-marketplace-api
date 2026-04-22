import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Category } from './category.entity';
import { Tag } from './tag.entity';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  title!: string;

  @Column('text')
  description!: string;

  @Column({ nullable: true })
  thumbnail?: string;

  @Column({ default: false })
  isPublished!: boolean;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  price!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToMany(() => Category, (category) => category.courses)
  @JoinTable()
  categories!: Category[];

  @ManyToMany(() => Tag, (tag) => tag.courses)
  @JoinTable()
  tags!: Tag[];
}
