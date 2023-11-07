import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDTO extends OmitType(CreateUserDto, [
  'password',
] as const) {
  id: number;
}
