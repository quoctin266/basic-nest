import { IsNotEmpty } from 'class-validator';

export class CompanyFilterDto {
  name: string;

  address: string;

  description: string;
}
