import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/user.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/users.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
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
        const result: IUser = {
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

  async login(user: IUser) {
    const { id, username, email, role } = user;
    const payload = {
      sub: 'token login',
      iss: 'from server',
      id,
      username,
      email,
      role,
    };
    return {
      access_token: this.jwtService.sign(payload),
      id,
      username,
      email,
      role,
    };
  }
}
