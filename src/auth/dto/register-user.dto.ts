import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  username: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
