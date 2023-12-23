import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StatusUpdatesService } from './status-updates.service';
import { CreateStatusUpdateDto } from './dto/create-status-update.dto';
import { UpdateStatusUpdateDto } from './dto/update-status-update.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller('status-updates')
@ApiExcludeController()
export class StatusUpdatesController {
  constructor(private readonly statusUpdatesService: StatusUpdatesService) {}

  @Post()
  create(@Body() createStatusUpdateDto: CreateStatusUpdateDto) {
    return this.statusUpdatesService.create(createStatusUpdateDto);
  }

  @Get()
  findAll() {
    return this.statusUpdatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusUpdatesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStatusUpdateDto: UpdateStatusUpdateDto,
  ) {
    return this.statusUpdatesService.update(+id, updateStatusUpdateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusUpdatesService.remove(+id);
  }
}
