import { Resume } from 'src/resumes/entities/resume.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class StatusUpdate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  status: string;

  // the date that the status update was made
  @CreateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Resume, (resume) => resume.history)
  resume: Resume;

  // the person that perform the update
  @ManyToOne(() => User)
  @JoinColumn({
    name: 'updatedBy',
    referencedColumnName: 'id',
  })
  updatedBy: User;
}
