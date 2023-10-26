import { Photo } from '../photos/photo.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: false })
  isActive: boolean;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => Photo, (photo) => photo.user, {
    cascade: ['insert', 'update'],
    eager: true,
  })
  photos: Photo[];
}
