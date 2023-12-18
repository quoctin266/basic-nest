import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class CompanyFilterDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  address?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;
}
