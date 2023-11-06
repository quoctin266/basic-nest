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
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.findAll();
  }

  @Post()
  async postCreateUser(@Body() createUserDTO: CreateUserDto) {
    return await this.userService.createUser(createUserDTO);
  }

  @Put(':userId')
  async postUpdateUser() {
    // @Param('userId', ParseIntPipe) userId: number, // @Body() data: updateRequestDTO,
    return await this.userService.update();
  }

  @Delete(':userId')
  async deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return await this.userService.remove(userId);
  }
}
