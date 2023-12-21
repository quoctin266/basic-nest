import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDateString,
  IsBoolean,
} from 'class-validator';

export class CreateJobDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  skills: string[];

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  salary: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  level: string;

  @IsNotEmpty()
  description: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsNotEmpty()
  @Type(() => Boolean)
  @IsBoolean()
  isActive: boolean;

  @IsNotEmpty()
  companyId: string;
}
