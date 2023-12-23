import { Injectable } from '@nestjs/common';
import { CreateStatusUpdateDto } from './dto/create-status-update.dto';
import { UpdateStatusUpdateDto } from './dto/update-status-update.dto';

@Injectable()
export class StatusUpdatesService {
  create(createStatusUpdateDto: CreateStatusUpdateDto) {
    return 'This action adds a new statusUpdate';
  }

  findAll() {
    return `This action returns all statusUpdates`;
  }

  findOne(id: number) {
    return `This action returns a #${id} statusUpdate`;
  }

  update(id: number, updateStatusUpdateDto: UpdateStatusUpdateDto) {
    return `This action updates a #${id} statusUpdate`;
  }

  remove(id: number) {
    return `This action removes a #${id} statusUpdate`;
  }
}
