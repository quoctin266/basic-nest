import { Controller, Get } from '@nestjs/common';
import { RolesService } from './role.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('roles')
@Controller('role')
export class RoleController {
  constructor(private rolesService: RolesService) {}

  @Get('')
  getProfile() {
    return this.rolesService.findAll();
  }
}
