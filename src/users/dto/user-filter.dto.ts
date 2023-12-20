import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class UserFilterDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;
}
