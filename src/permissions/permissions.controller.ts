import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ResponseMessage, UserDec } from 'src/decorator/customize';
import { ApiTags } from '@nestjs/swagger';
import { UserDTO } from 'src/users/users.dto';

@ApiTags('permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @ResponseMessage('Create permission successfully')
  create(
    @Body() createPermissionDto: CreatePermissionDto,
    @UserDec() user: UserDTO,
  ) {
    return this.permissionsService.create(createPermissionDto, user);
  }

  @Get()
  @ResponseMessage('Fetch all permissions')
  findAll() {
    return this.permissionsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.permissionsService.findOne(+id);
  // }

  @Patch(':id')
  @ResponseMessage('Update permission successfully')
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
    @UserDec() user: UserDTO,
  ) {
    return this.permissionsService.update(id, updatePermissionDto, user);
  }

  @Delete(':id')
  @ResponseMessage('Delete permission successfully')
  remove(@Param('id') id: string, @UserDec() user: UserDTO) {
    return this.permissionsService.remove(id, user);
  }
}
