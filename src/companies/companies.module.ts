import { Module, forwardRef } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { User } from 'src/users/user.entity';
import { UsersModule } from 'src/users/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company, User]),
    forwardRef(() => UsersModule),
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports: [CompaniesService],
})
export class CompaniesModule {}
