import { PartialType } from '@nestjs/swagger';
import { CreateStatusUpdateDto } from './create-status-update.dto';

export class UpdateStatusUpdateDto extends PartialType(CreateStatusUpdateDto) {}
