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
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  description: string;

  @Column()
  logo: string;

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
    foreignKeyConstraintName: 'custom1',
  })
  updatedBy: User;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({
    name: 'createdBy',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'custom2',
  })
  createdBy: User;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({
    name: 'deletedBy',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'custom3',
  })
  deletedBy: User;
}
