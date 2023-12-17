import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty({ example: 'string' })
  access_token: string;

  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'string' })
  username: string;

  @ApiProperty({ example: 'string' })
  email: string;

  @ApiProperty({ example: 'string' })
  role: string;
}

export class SuccessResponse {
  @ApiProperty({ example: '201', description: 'status code' })
  statusCode: number;

  @ApiProperty({ example: 'Login successfully', description: 'status message' })
  message: string;

  @ApiProperty({ type: LoginResponse, description: 'data' })
  data: LoginResponse;
}
