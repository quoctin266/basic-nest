import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { RolesService } from './role.service';
import { ApiTags } from '@nestjs/swagger';
import { ResponseMessage, UserDec } from 'src/decorator/customize';
import { UserDTO } from 'src/users/users.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@ApiTags('roles')
@Controller('role')
export class RoleController {
  constructor(private rolesService: RolesService) {}

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Post()
  @ResponseMessage('Create role successfully')
  create(@Body() createRoleDto: CreateRoleDto, @UserDec() user: UserDTO) {
    return this.rolesService.create(createRoleDto, user);
  }

  @Put(':id')
  @ResponseMessage('Update role successfully')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
    @UserDec() user: UserDTO,
  ) {
    return this.rolesService.update(id, updateRoleDto, user);
  }

  @Delete(':id')
  @ResponseMessage('Delete role successfully')
  remove(@Param('id', ParseIntPipe) id: number, @UserDec() user: UserDTO) {
    return this.rolesService.remove(id, user);
  }
}
