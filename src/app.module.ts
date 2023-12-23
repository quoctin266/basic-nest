import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
// import { JwtAuthGuard } from './auth/jwt-auth.guard';
// import { APP_GUARD } from '@nestjs/core';
import { CompaniesModule } from './companies/companies.module';
import { RolesModule } from './role/role.module';
import { typeOrmAsyncConfig } from './config.service';
import { JobsModule } from './jobs/jobs.module';
import { FilesModule } from './files/files.module';
import { ResumesModule } from './resumes/resumes.module';
import { StatusUpdatesModule } from './status-updates/status-updates.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    CompaniesModule,
    RolesModule,
    JobsModule,
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    FilesModule,
    ResumesModule,
    StatusUpdatesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
})
export class AppModule {}
