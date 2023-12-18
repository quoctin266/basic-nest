import { Inject, Injectable, forwardRef } from '@nestjs/common';
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
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  async create(createCompanyDto: CreateCompanyDto, user: IUser) {
    const creator = await this.usersService.findOne(user.id);

    const result = await this.companiesRepository.insert({
      ...createCompanyDto,
      createdBy: creator,
    });

    return result.generatedMaps[0];
  }

  async findAll(queryObj: CompanyFilterDto) {
    const defaultLimit = queryObj.limit ? queryObj.limit : 10;
    const offset = (queryObj.page - 1) * defaultLimit;

    const query = this.companiesRepository.createQueryBuilder('company');

    if (queryObj.name)
      query.andWhere('company.name like :name', { name: `%${queryObj.name}%` });
    if (queryObj.address)
      query.andWhere('company.address = :address', {
        address: queryObj.address,
      });

    const totalItems = (await query.getMany()).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const res = await query
      .leftJoinAndSelect('company.createdBy', 'user')
      // .select([
      //   'user.email',
      //   'user.id',
      //   'user.username',
      //   'user.phone',
      //   'user.age',
      //   'company',
      // ])
      .offset(offset ? offset : 0)
      .limit(defaultLimit)
      .getMany();

    return {
      meta: {
        current: queryObj.page ? queryObj.page : 1,
        pageSize: defaultLimit,
        pages: totalPages,
        total: totalItems,
      },
      result: res,
    };
  }

  findOne(id: string) {
    return this.companiesRepository.findOneBy({ id });
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
