import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Course } from './course.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @ManyToMany(() => Course, (course) => course.categories)
  courses!: Course[];
}
