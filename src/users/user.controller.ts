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
import { IUser } from './users.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getAllUsers(@Query() query) {
    const { page, limit } = <{ page: number; limit: number }>query;

    return this.userService.findAll(+page, +limit);
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
    @UserDec() user: IUser,
  ) {
    return this.userService.createUser(createUserDTO, user);
  }

  @Put()
  @ResponseMessage('Update user successfully')
  async postUpdateUser(@Body() data: UpdateUserDTO, @UserDec() user: IUser) {
    return await this.userService.update(data, user);
  }

  @Delete(':userId')
  @ResponseMessage('Delete user successfully')
  async deleteUser(
    @Param('userId', ParseIntPipe) userId: number,
    @UserDec() user: IUser,
  ) {
    return await this.userService.remove(userId, user);
  }
}
