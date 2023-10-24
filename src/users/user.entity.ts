import { Photo } from '../photos/photo.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

  @OneToMany(() => Photo, (photo) => photo.user, {
    cascade: ['insert', 'update'],
  })
  photos: Photo[];
}
