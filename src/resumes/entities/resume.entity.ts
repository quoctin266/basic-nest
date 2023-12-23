import { Job } from 'src/jobs/entities/job.entity';
import { StatusUpdate } from 'src/status-updates/entities/status-update.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Resume {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  url: string;

  @Column()
  status: string;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Job)
  job: Job;

  @OneToMany(() => StatusUpdate, (statusUpdate) => statusUpdate.resume, {
    cascade: ['insert', 'update'],
    eager: true,
  })
  history: StatusUpdate[];

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
