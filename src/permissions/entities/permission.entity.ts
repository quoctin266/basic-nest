import { Role } from 'src/role/entities/role.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  apiPath: string;

  @Column()
  method: string;

  @Column()
  module: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];

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
