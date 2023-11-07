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
} from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async getUserDetail(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOne(id);
    if (user)
      return {
        error: 0,
        message: null,
        data: user,
      };
    else return new NotFoundException();
  }

  @Post()
  async postCreateUser(@Body() createUserDTO: CreateUserDto) {
    return await this.userService.createUser(createUserDTO);
  }

  @Put()
  async postUpdateUser(@Body() data: UpdateUserDTO) {
    return await this.userService.update(data);
  }

  @Delete(':userId')
  async deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return await this.userService.remove(userId);
  }
}
