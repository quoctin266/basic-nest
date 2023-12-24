import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';
import { UserDTO } from 'src/users/users.dto';
import { UsersService } from 'src/users/user.service';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
    private usersService: UsersService,
  ) {}
  async create(createPermissionDto: CreatePermissionDto, user: UserDTO) {
    const creator = await this.usersService.findOne(user.id);
    const result = await this.permissionsRepository.insert({
      ...createPermissionDto,
      createdBy: creator,
    });

    return result.generatedMaps[0];
  }

  findAll() {
    return this.permissionsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }

  async update(
    id: string,
    updatePermissionDto: UpdatePermissionDto,
    user: UserDTO,
  ) {
    const updater = await this.usersService.findOne(user.id);

    return this.permissionsRepository.update(id, {
      ...updatePermissionDto,
      updatedBy: updater,
    });
  }

  async remove(id: string, user: UserDTO) {
    const deleter = await this.usersService.findOne(user.id);
    await this.permissionsRepository.update(id, {
      deletedBy: deleter,
    });

    return this.permissionsRepository.softDelete(id);
  }
}
