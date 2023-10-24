import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { User } from './user.entity';
import { Photo } from 'src/photos/photo.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
    private dataSource: DataSource,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async createUser(user) {
    if (user.isActive !== '0' && user.isActive !== 'false')
      user.isActive = true;
    else user.isActive = false;

    const newUser = this.usersRepository.create({
      firstName: user.firstName,
      lastName: user.lastName,
      isActive: user.isActive,
      photos: [
        {
          url: user.photo,
        },
      ],
    });

    await this.usersRepository.save(newUser);

    console.log(newUser);
    return 'ok';
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  getHello123(): string {
    return 'Hello test!';
  }
}
