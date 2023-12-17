import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty()
  @ApiProperty({ example: 'user@gmail.com', description: 'user email' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: '123456', description: 'user password' })
  password: string;
}
