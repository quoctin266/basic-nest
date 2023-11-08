import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { User } from './user.entity';
import { Photo } from 'src/photos/photo.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { genSalt, hash, compare } from 'bcryptjs';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
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

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async createUser(createUserDTO: CreateUserDto) {
    // const newUser = this.usersRepository.create({
    //   firstName: user.firstName,
    //   lastName: user.lastName,
    //   isActive: user.isActive,
    //   photos: [
    //     {
    //       url: user.photo,
    //     },
    //   ],
    // });

    // await this.usersRepository.save(newUser);

    // console.log(newUser);
    createUserDTO.password = await this.hashPassword(createUserDTO.password);
    return await this.usersRepository.insert(createUserDTO);
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async remove(id: number) {
    return await this.usersRepository.softDelete(id);
  }

  async update(updateUserDTO: UpdateUserDTO) {
    return await this.usersRepository.update(updateUserDTO.id, {
      ...updateUserDTO,
    });
  }
}
