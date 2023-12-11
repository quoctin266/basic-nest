import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async findAll() {
    return await this.rolesRepository.find();
  }

  findOne(name: string): Promise<Role | null> {
    return this.rolesRepository.findOneBy({ name });
  }

  findById(id: number): Promise<Role | null> {
    return this.rolesRepository.findOneBy({ id });
  }
}
