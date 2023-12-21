import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class UserFilterDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  current?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  pageSize?: number;
}
