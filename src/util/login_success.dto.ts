import { ApiProperty } from '@nestjs/swagger';
import { UserDTO } from 'src/users/users.dto';

export class LoginResponse {
  @ApiProperty({ example: 'string' })
  accessToken: string;

  @ApiProperty({ example: 'string' })
  resfreshToken: string;

  @ApiProperty({ type: UserDTO })
  user: UserDTO;
}

export class SuccessResponse {
  @ApiProperty({ example: '201', description: 'status code' })
  statusCode: number;

  @ApiProperty({ example: 'Login successfully', description: 'status message' })
  message: string;

  @ApiProperty({ type: LoginResponse, description: 'data' })
  data: LoginResponse;
}
