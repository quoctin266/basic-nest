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
import { ResumesService } from './resumes.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { ApiTags } from '@nestjs/swagger';
import { ResponseMessage, UserDec } from 'src/decorator/customize';
import { UserDTO } from 'src/users/users.dto';
import { ResumeFilterDto } from './dto/resume-filter.dto';

@ApiTags('resumes')
@Controller('resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}

  @Post()
  @ResponseMessage('Apply job successfully')
  create(@Body() createResumeDto: CreateResumeDto, @UserDec() user: UserDTO) {
    return this.resumesService.create(createResumeDto, user);
  }

  @Get()
  @ResponseMessage('Fetch resume list successfully')
  findAll(@Query() query: ResumeFilterDto) {
    return this.resumesService.findAll(query.current, query.pageSize);
  }

  // do not place this API below findOne API, 'user' in @Get() will be used as value for param @Get(':id')
  @Get('user')
  @ResponseMessage('Fetch user resume list successfully')
  findUserResume(@UserDec() user: UserDTO) {
    return this.resumesService.findUserResume(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resumesService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Update successfully')
  update(
    @Param('id') id: string,
    @Body() updateResumeDto: UpdateResumeDto,
    @UserDec() user: UserDTO,
  ) {
    return this.resumesService.update(id, updateResumeDto, user);
  }

  @Delete(':id')
  @ResponseMessage('Delete successfully')
  remove(@Param('id') id: string, @UserDec() user: UserDTO) {
    return this.resumesService.remove(id, user);
  }
}
