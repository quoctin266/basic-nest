import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { UserDTO } from 'src/users/users.dto';
import { Job } from './entities/job.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/user.service';
import { CompaniesService } from 'src/companies/companies.service';
import { JobFilterDto } from './dto/job-filter.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobsRepository: Repository<Job>,
    private usersService: UsersService,
    private companiessService: CompaniesService,
  ) {}
  async create(createJobDto: CreateJobDto, user: UserDTO) {
    const creator = await this.usersService.findOne(user.id);
    const company = await this.companiessService.findOne(
      createJobDto.companyId,
    );

    const result = await this.jobsRepository.insert({
      ...createJobDto,
      createdBy: creator,
      company,
    });

    return result.generatedMaps[0];
  }

  async findAll(queryObj: JobFilterDto) {
    const { current, pageSize } = queryObj;
    const defaultLimit = pageSize ? pageSize : 10;
    const offset = (current ? current : 1 - 1) * defaultLimit;

    const query = this.jobsRepository.createQueryBuilder('job');

    const totalItems = (await query.getMany()).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const res = await query
      .leftJoinAndSelect('job.company', 'company')
      .offset(offset ? offset : 0)
      .limit(defaultLimit)
      .getMany();

    return {
      meta: {
        current: current ? current : 1,
        pageSize: defaultLimit,
        pages: totalPages,
        total: totalItems,
      },
      result: res,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} job`;
  }

  async update(id: string, updateJobDto: UpdateJobDto, user: UserDTO) {
    const updater = await this.usersService.findOne(user.id);
    const company = await this.companiessService.findOne(
      updateJobDto.companyId,
    );

    const { companyId, ...updateInfo } = updateJobDto;
    return this.jobsRepository.update(id, {
      ...updateInfo,
      updatedBy: updater,
      company,
    });
  }

  async remove(id: string, user: UserDTO) {
    const deleter = await this.usersService.findOne(user.id);
    await this.jobsRepository.update(id, {
      deletedBy: deleter,
    });

    return this.jobsRepository.softDelete(id);
  }
}
