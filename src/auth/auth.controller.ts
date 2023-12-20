import {
  Controller,
  Post,
  UseGuards,
  Body,
  Res,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public, ResponseMessage, UserDec } from 'src/decorator/customize';
import { LocalAuthGuard } from './local-auth.guard';
import { Response, Request } from 'express';
import { UserDTO } from 'src/users/users.dto';
import { UsersService } from 'src/users/user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { SuccessResponse } from 'src/util/login_success.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Public()
  @Post('login')
  @ResponseMessage('Login successfully')
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({
    status: 201,
    description: 'ok',
    type: SuccessResponse,
  })
  @UseGuards(LocalAuthGuard)
  login(
    @UserDec() user: UserDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(user, response);
  }

  @Public()
  @Post('register')
  @ResponseMessage('Register successfully')
  register(@Body() registerUserDTO: RegisterUserDto) {
    return this.usersService.registerUser(registerUserDTO);
  }

  @Get('account')
  @ResponseMessage('Fetch current user info')
  getAccount(@UserDec() user: UserDTO) {
    return user;
  }

  @Public()
  @Get('refresh')
  @ResponseMessage('Get new token')
  refreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.processNewToken(
      request.cookies['refresh_token'],
      response,
    );
  }

  @Post('logout')
  @ResponseMessage('Logout successfully')
  logout(
    @Res({ passthrough: true }) response: Response,
    @UserDec() user: UserDTO,
  ) {
    return this.authService.clearToken(response, user);
  }
}
