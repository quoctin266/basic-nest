import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { ApiTags } from '@nestjs/swagger';
import { ResponseMessage, UserDec } from 'src/decorator/customize';
import { UserDTO } from 'src/users/users.dto';
import { JobFilterDto } from 'src/jobs/dto/job-filter.dto';

@ApiTags('subscribers')
@Controller('subscribers')
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) {}

  @Post()
  @ResponseMessage('Create subscriber successfully')
  create(
    @Body() createSubscriberDto: CreateSubscriberDto,
    @UserDec() user: UserDTO,
  ) {
    return this.subscribersService.create(createSubscriberDto, user);
  }

  @Get()
  @ResponseMessage('Fetch subscriber list successfully')
  findAll(@Query() query: JobFilterDto) {
    return this.subscribersService.findAll(query.current, query.pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscribersService.findOne(+id);
  }

  @Patch(':id')
  @ResponseMessage('Update subscriber successfully')
  update(
    @Param('id') id: string,
    @Body() updateSubscriberDto: UpdateSubscriberDto,
    @UserDec() user: UserDTO,
  ) {
    return this.subscribersService.update(id, updateSubscriberDto, user);
  }

  @Delete(':id')
  @ResponseMessage('Delete subscriber successfully')
  remove(@Param('id') id: string, @UserDec() user: UserDTO) {
    return this.subscribersService.remove(id, user);
  }
}
