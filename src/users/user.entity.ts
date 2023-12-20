import { Company } from 'src/companies/entities/company.entity';
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
import { Role } from 'src/role/entities/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  phone: string;

  @Column()
  age: number;

  @Column({
    length: 500,
  })
  refreshToken: string;

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

  @ManyToOne(() => Company)
  company: Company;

  @ManyToOne(() => Role, { eager: true })
  role: Role;

  // @BeforeInsert()
  // async hashPassword() {
  //   const salt = await genSalt(10);
  //   this.password = await hash(this.password, salt);
  // }

  // @OneToMany(() => Company, (company) => company.createdBy)
  // companies: Company[];
}
