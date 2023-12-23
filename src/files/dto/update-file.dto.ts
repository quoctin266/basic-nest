import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateFileDto } from './create-file.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateFileDto extends PartialType(CreateFileDto) {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: Express.Multer.File;

  @IsNotEmpty()
  oldFileName: string;
}
