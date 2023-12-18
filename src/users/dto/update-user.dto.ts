import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';
import { OmitType } from '@nestjs/swagger';

export class UpdateUserDTO extends OmitType(CreateUserDto, [
  'password',
] as const) {
  @IsNotEmpty()
  id: number;
}
