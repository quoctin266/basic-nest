import { Module } from '@nestjs/common';
import { StatusUpdatesService } from './status-updates.service';
import { StatusUpdatesController } from './status-updates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusUpdate } from './entities/status-update.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StatusUpdate])],
  controllers: [StatusUpdatesController],
  providers: [StatusUpdatesService],
  exports: [StatusUpdatesService],
})
export class StatusUpdatesModule {}
