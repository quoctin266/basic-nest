import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './user.service';
// import { UsersController } from './users.controller';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { RolesModule } from 'src/role/role.module';
import { CompaniesModule } from 'src/companies/companies.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RolesModule,
    forwardRef(() => CompaniesModule),
  ],
  providers: [UsersService],
  controllers: [UserController],
  exports: [UsersService],
})
export class UsersModule {}
