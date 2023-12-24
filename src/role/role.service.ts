import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, In } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UserDTO } from 'src/users/users.dto';
import { User } from 'src/users/user.entity';
import { Permission } from 'src/permissions/entities/permission.entity';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    // private usersService: UsersService,
    private dataSource: DataSource,
  ) {}

  async findAll() {
    return await this.rolesRepository.find({
      relations: {
        permissions: true,
      },
    });
  }

  async create(createRoleDto: CreateRoleDto, user: UserDTO) {
    const usersRepository = this.dataSource.getRepository(User);
    const permissionsRepository = this.dataSource.getRepository(Permission);
    const creator = await usersRepository.findOneBy({ id: user.id });

    let permissions = [];
    if (createRoleDto.permissions)
      permissions = await permissionsRepository.findBy({
        id: In(createRoleDto.permissions),
      });
    const result = await this.rolesRepository.save({
      ...createRoleDto,
      permissions,
      createdBy: creator,
    });

    return { id: result.id, createdAt: result.createdAt };
  }

  async update(id: number, updateRoleDto: UpdateRoleDto, user: UserDTO) {
    const { permissions, ...updateInfo } = updateRoleDto;
    const usersRepository = this.dataSource.getRepository(User);
    const permissionsRepository = this.dataSource.getRepository(Permission);
    const updater = await usersRepository.findOneBy({ id: user.id });
    const role = await this.rolesRepository.findOneBy({ id: id });

    let newPermissions: Permission[] = [];
    // if update payload contain permission changes, fetch permissions in payload
    if (permissions && permissions.length > 0)
      newPermissions = await permissionsRepository.findBy({
        id: In(permissions),
      });
    // delete all permissions
    if (permissions && permissions.length === 0) {
      role.permissions = [];
      await this.rolesRepository.save(role);
    }
    // only update permissions if there are changes
    if (newPermissions.length > 0) {
      role.permissions = newPermissions;
      await this.rolesRepository.save(role);
    }

    return this.rolesRepository.update(id, {
      ...updateInfo,
      updatedBy: updater,
    });
  }

  findOne(name: string): Promise<Role | null> {
    return this.rolesRepository.findOneBy({ name });
  }

  findById(id: number): Promise<Role | null> {
    return this.rolesRepository.findOneBy({ id });
  }

  async remove(id: number, user: UserDTO) {
    const adminRole = await this.rolesRepository.findOneBy({ id });
    if (adminRole.name === 'ADMIN')
      throw new BadRequestException('Cannot delete admin role');
    const usersRepository = this.dataSource.getRepository(User);
    const deleter = await usersRepository.findOneBy({ id: user.id });
    await this.rolesRepository.update(id, {
      deletedBy: deleter,
    });

    return this.rolesRepository.softDelete(id);
  }
}
