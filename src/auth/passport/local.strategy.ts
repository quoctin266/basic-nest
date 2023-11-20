import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { IUser } from 'src/users/users.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user: IUser = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid username/password');
    }
    return user;
  }
}
