import {
  ConflictException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { genSalt, hash, compare } from 'bcryptjs';
import { UpdateUserDTO } from './dto/update-user.dto';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';
import { Role } from 'src/role/entities/role.entity';
import { IUser } from './users.interface';
import { RolesService } from 'src/role/role.service';
import { CompaniesService } from 'src/companies/companies.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>, // private dataSource: DataSource,
    private rolesService: RolesService,
    @Inject(forwardRef(() => CompaniesService))
    private companiessService: CompaniesService,
    private dataSource: DataSource,
  ) {}

  async hashPassword(password: string) {
    const salt = await genSalt(10);
    const hashPW = await hash(password, salt);
    return hashPW;
  }

  async checkPassword(hash: string, password: string) {
    return await compare(password, hash);
  }

  findAll(page: number, limit: number) {
    const defaultLimit = limit ? limit : 10;
    const offset = (page - 1) * defaultLimit;

    return this.usersRepository.find({
      skip: offset ? offset : 0,
      take: defaultLimit,
    });
  }

  async registerUser(registerUserDTO: RegisterUserDto) {
    const user = await this.usersRepository.findOneBy({
      email: registerUserDTO.email,
    });
    if (user) throw new ConflictException('Email already existed');

    registerUserDTO.password = await this.hashPassword(
      registerUserDTO.password,
    );

    const role = await this.dataSource
      .getRepository(Role)
      .createQueryBuilder('role')
      .where('role.name = :name', { name: 'USER' })
      .getOne();

    const result = await this.usersRepository.insert({
      ...registerUserDTO,
      role,
    });

    return result.generatedMaps[0];
  }

  async createUser(createUserDTO: CreateUserDto, creatorInfo: IUser) {
    const user = await this.usersRepository.findOneBy({
      email: createUserDTO.email,
    });
    if (user) throw new ConflictException('Email already existed');

    createUserDTO.password = await this.hashPassword(createUserDTO.password);
    const creator = await this.findOne(creatorInfo.id);
    const role = await this.rolesService.findById(createUserDTO.roleId);
    const company = await this.companiessService.findOne(
      createUserDTO.companyId,
    );

    const result = await this.usersRepository.insert({
      ...createUserDTO,
      createdBy: creator,
      role,
      company,
    });

    return result.generatedMaps[0];
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .where('user.email = :email', { email })
      .addSelect('user.password')
      .getOne();
  }

  async remove(id: number, deleterInfo: IUser) {
    const deleter = await this.findOne(deleterInfo.id);
    await this.usersRepository.update(id, {
      deletedBy: deleter,
    });

    return this.usersRepository.softDelete(id);
  }

  async update(updateUserDTO: UpdateUserDTO, updaterInfo: IUser) {
    const updater = await this.findOne(updaterInfo.id);
    const role = await this.rolesService.findById(updateUserDTO.roleId);
    const company = await this.companiessService.findOne(
      updateUserDTO.companyId,
    );

    const { roleId, companyId, ...updateInfo } = updateUserDTO;
    return this.usersRepository.update(updateUserDTO.id, {
      ...updateInfo,
      updatedBy: updater,
      role,
      company,
    });
  }
}
