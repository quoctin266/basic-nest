import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { DataSource } from 'typeorm';

config();

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

const dbConfig = {
  type: 'mysql' as const,
  host: process.env.DB_HOST,
  port: +process.env.DB_POST,
  username: process.env.DB_USER,
  database: process.env.DB_NAME,
  autoLoadEntities: true,
  synchronize: true,
  migrationsRun: true,
  migrations: ['src/migration/*.ts'],
};

export default new DataSource(dbConfig);
