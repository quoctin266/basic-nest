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
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { ApiTags } from '@nestjs/swagger';
import { ResponseMessage, UserDec } from 'src/decorator/customize';
import { UserDTO } from 'src/users/users.dto';
import { JobFilterDto } from './dto/job-filter.dto';

@ApiTags('jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @ResponseMessage('Create job successfully')
  create(@Body() createJobDto: CreateJobDto, @UserDec() user: UserDTO) {
    return this.jobsService.create(createJobDto, user);
  }

  @Get()
  @ResponseMessage('Fetch job list successfully')
  findAll(@Query() query: JobFilterDto) {
    return this.jobsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(+id);
  }

  @Patch(':id')
  @ResponseMessage('Update job successfully')
  update(
    @Param('id') id: string,
    @Body() updateJobDto: UpdateJobDto,
    @UserDec() user: UserDTO,
  ) {
    return this.jobsService.update(id, updateJobDto, user);
  }

  @Delete(':id')
  @ResponseMessage('Delete job successfully')
  remove(@Param('id') id: string, @UserDec() user: UserDTO) {
    return this.jobsService.remove(id, user);
  }
}
