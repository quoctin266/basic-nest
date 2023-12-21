import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  ParseIntPipe,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { ResponseMessage, UserDec } from 'src/decorator/customize';
import { UserDTO } from './users.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserFilterDto } from './dto/user-filter.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @ResponseMessage('Fetch list user successfully')
  getAllUsers(@Query() query: UserFilterDto) {
    const { current, pageSize } =
      /*<{ current: number; pageSize: number }>*/ query;

    return this.userService.findAll(current, pageSize);
  }

  @Get(':id')
  async getUserDetail(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOne(id);
    if (user) return user;
    else throw new NotFoundException();
  }

  @Post()
  @ResponseMessage('Create user successfully')
  async postCreateUser(
    @Body() createUserDTO: CreateUserDto,
    @UserDec() user: UserDTO,
  ) {
    return this.userService.createUser(createUserDTO, user);
  }

  @Put()
  @ResponseMessage('Update user successfully')
  async postUpdateUser(@Body() data: UpdateUserDTO, @UserDec() user: UserDTO) {
    return await this.userService.update(data, user);
  }

  @Delete(':userId')
  @ResponseMessage('Delete user successfully')
  async deleteUser(
    @Param('userId', ParseIntPipe) userId: number,
    @UserDec() user: UserDTO,
  ) {
    return await this.userService.remove(userId, user);
  }
}
