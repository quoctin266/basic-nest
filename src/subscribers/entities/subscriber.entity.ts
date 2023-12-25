import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Subscriber {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column('simple-array')
  skills: string[];

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({
    name: 'updatedBy',
    referencedColumnName: 'id',
  })
  updatedBy: User;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({
    name: 'createdBy',
    referencedColumnName: 'id',
  })
  createdBy: User;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({
    name: 'deletedBy',
    referencedColumnName: 'id',
  })
  deletedBy: User;
}
