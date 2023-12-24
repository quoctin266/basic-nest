import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { RolesService } from './role.service';
import { RoleController } from './role.controller';
import { UsersModule } from 'src/users/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RolesService],
  controllers: [RoleController],
  exports: [RolesService],
})
export class RolesModule {}
