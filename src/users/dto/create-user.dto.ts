import { Allow, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @Transform(({ value }) => {
    return Number(value);
  }) // convert falsy value to 0
  age: number;

  @IsNotEmpty()
  roleId: number;

  @IsOptional()
  companyId: string;
}
