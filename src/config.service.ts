import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { DataSource } from 'typeorm';

const dbConfig = {
  type: 'mysql' as const,
  host: 'localhost',
  port: 3306,
  username: 'root',
  database: 'nest_basic',
  autoLoadEntities: true,
  synchronize: true,
  migrationsRun: true,
  migrations: ['src/migration/*.ts'],
};

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

export default new DataSource(dbConfig);
