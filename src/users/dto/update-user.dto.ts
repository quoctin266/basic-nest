import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDTO extends OmitType(CreateUserDto, [
  'password',
] as const) {
  @IsNotEmpty()
  id: number;
}
