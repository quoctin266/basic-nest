import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.findAll();
  }

  @Post()
  async postCreateUser(@Body() data: Body) {
    return await this.userService.createUser(data);
  }
}
