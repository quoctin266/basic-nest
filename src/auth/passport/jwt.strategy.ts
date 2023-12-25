import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserDTO } from 'src/users/users.dto';
import { RolesService } from 'src/role/role.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private rolesService: RolesService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN'),
    });
  }

  async validate(payload: UserDTO) {
    const { id, username, email, role } = payload;
    const permissions = (await this.rolesService.findOne(role)).permissions;

    // run handleRequest() in jwt auth guard with this as user parameter
    return { id, username, email, role, permissions };
  }
}
