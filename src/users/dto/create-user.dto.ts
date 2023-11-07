import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  username: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
