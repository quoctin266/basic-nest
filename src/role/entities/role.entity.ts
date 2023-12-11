import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  isActive: boolean;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'updatedBy',
    referencedColumnName: 'id',
  })
  updatedBy: User;

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'createdBy',
    referencedColumnName: 'id',
  })
  createdBy: User;

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'deletedBy',
    referencedColumnName: 'id',
  })
  deletedBy: User;
}
