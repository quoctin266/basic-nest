import { IsNotEmpty } from 'class-validator';

export class CreateResumeDto {
  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  jobId: string;

  //   @IsNotEmpty()
  //   email: string;

  //   @IsNotEmpty()
  //   @Type(() => Number)
  //   @IsNumber()
  //   userId: number;
}
