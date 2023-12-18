import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Version,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ResponseMessage, UserDec } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';
import { CompanyFilterDto } from './dto/company-filter.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @ResponseMessage('Create company successfully')
  create(@Body() createCompanyDto: CreateCompanyDto, @UserDec() user: IUser) {
    return this.companiesService.create(createCompanyDto, user);
  }

  @Version('1')
  @Get()
  // set response message as meta data
  @ResponseMessage('Fetching company list success')
  findAll(@Query() query: CompanyFilterDto) {
    // const { page, limit, ...filter } = <{ page: number; limit: number }>query;
    return this.companiesService.findAll(query);
  }

  // @Version('2')
  // @Get()
  // findAllV2(@Query() query) {
  //   return 'fetch version 2';
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Update company successfully')
  update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @UserDec() user: IUser,
  ) {
    return this.companiesService.update(id, updateCompanyDto, user);
  }

  @Delete(':id')
  @ResponseMessage('Delete company successfully')
  remove(@Param('id') id: string, @UserDec() user: IUser) {
    return this.companiesService.remove(id, user);
  }
}
