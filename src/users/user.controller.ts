import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { updateRequestDTO } from './updateRequestDTO';

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

  @Put(':userId')
  async postUpdateUser(
    @Body() data: updateRequestDTO,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return await this.userService.update(userId, data);
  }

  @Delete(':userId')
  async deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return await this.userService.remove(userId);
  }
}
