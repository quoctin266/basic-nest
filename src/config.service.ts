import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { Company } from 'src/companies/entities/company.entity';
import { User } from './users/user.entity';
import { Role } from './role/entities/role.entity';
import { Job } from './jobs/entities/job.entity';

config();

// for connecting to database
export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: (configService: ConfigService) => ({
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: +configService.get('DB_PORT'),
    username: configService.get('DB_USER'),
    database: configService.get('DB_NAME'),
    autoLoadEntities: true,
    synchronize: true,
    migrationsRun: true,
    migrations: [join(__dirname, 'migration', '*.{ts,js}')],
  }),
  inject: [ConfigService],
};

// for migrating and seeding
const dbConfig: DataSourceOptions & SeederOptions = {
  type: 'mysql' as const,
  host: process.env.DB_HOST,
  port: +process.env.DB_POST,
  username: process.env.DB_USER,
  database: process.env.DB_NAME,
  entities: [Company, User, Role, Job],
  synchronize: true,
  migrationsRun: true,
  migrations: ['src/migration/*.ts'],
  factories: ['src/factories/*.ts'],
  seeds: ['src/seeder/*.ts'],
};

export default new DataSource(dbConfig);
