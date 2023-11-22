import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from 'src/users/users.interface';
import { UsersService } from 'src/users/user.service';
import { CompanyFilterDto } from './dto/company-filter.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companiesRepository: Repository<Company>,
    private usersService: UsersService,
  ) {}

  async create(createCompanyDto: CreateCompanyDto, user: IUser) {
    const creator = await this.usersService.findOne(user.id);
    return this.companiesRepository.insert({
      ...createCompanyDto,
      createdBy: creator,
    });
  }

  findAll(page: number, limit: number, filter: CompanyFilterDto) {
    const offset = (page - 1) * limit;

    const query = this.companiesRepository.createQueryBuilder('company');

    if (filter.name)
      query.andWhere('company.name = :name', { name: filter.name });
    if (filter.address)
      query.andWhere('company.address = :address', { address: filter.address });

    return query
      .leftJoinAndSelect('company.createdBy', 'user')
      .select([
        'user.email',
        'user.id',
        'user.username',
        'user.phone',
        'user.age',
        'company',
      ])
      .offset(offset)
      .limit(limit)
      .getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto, user: IUser) {
    const updater = await this.usersService.findOne(user.id);
    return this.companiesRepository.update(id, {
      ...updateCompanyDto,
      updatedBy: updater,
    });
  }

  async remove(id: string, user: IUser) {
    const deleter = await this.usersService.findOne(user.id);
    await this.companiesRepository.update(id, {
      deletedBy: deleter,
    });
    return this.companiesRepository.softDelete(id);
  }
}