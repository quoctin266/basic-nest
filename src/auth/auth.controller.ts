import { Controller, Get, Post, UseGuards, Req, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public, UserDec } from 'src/decorator/customize';
import { LocalAuthGuard } from './local-auth.guard';
import { Request } from 'express';
import { IUser } from 'src/users/users.interface';
import { UsersService } from 'src/users/user.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Public()
  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@UserDec() user: IUser) {
    return this.authService.login(user);
  }

  @Public()
  @Post('register')
  register(@Body() registerUserDTO: RegisterUserDto) {
    return this.usersService.registerUser(registerUserDTO);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
