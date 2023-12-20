import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from 'src/users/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from 'src/users/users.dto';
import { LoginResponse } from 'src/util/login_success.dto';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import ms from 'ms';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      const checkPW = await this.usersService.checkPassword(
        user.password,
        pass,
      );
      if (checkPW === true) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const result: UserDTO = {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role.name,
        };

        return result;
      }
    }
    return null;
  }

  async login(user: UserDTO, response: Response) {
    const { id, username, email, role } = user;
    const payload = {
      sub: 'token login',
      iss: 'from server',
      id,
      username,
      email,
      role,
    };

    // generate new refresh token and update it to database
    const resfreshToken = this.createRefreshToken(payload);
    await this.usersService.updateUserToken(resfreshToken, id);

    // response.clearCookie('refresh_token');
    response.cookie('refresh_token', resfreshToken, {
      httpOnly: true,
      maxAge: ms(this.configService.get<string>('JWT_REFRESH_EXPIRE')),
    });

    return {
      accessToken: this.jwtService.sign(payload),
      resfreshToken,
      user: {
        id,
        username,
        email,
        role,
      } as UserDTO,
    } as LoginResponse;
  }

  createRefreshToken(payload: any) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRE'),
    });
  }

  processNewToken = async (refreshToken: string, response: Response) => {
    try {
      this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN'),
      });

      // find user with current token and update new token for user
      const user = await this.usersService.findOneByToken(refreshToken);
      const { id, username, email, role } = user;
      return await this.login(
        { id, username, email, role: role.name },
        response,
      );
    } catch (error) {
      throw new BadRequestException('Invalid refresh token');
    }
  };

  async clearToken(response: Response, user: UserDTO) {
    response.clearCookie('refresh_token');
    await this.usersService.updateUserToken('', user.id);

    return null;
  }
}
