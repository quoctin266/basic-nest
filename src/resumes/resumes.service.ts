import { Injectable } from '@nestjs/common';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { UserDTO } from 'src/users/users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Resume } from './entities/resume.entity';
import { DataSource, Repository } from 'typeorm';
import { UsersService } from 'src/users/user.service';
import { JobsService } from 'src/jobs/jobs.service';
import { User } from 'src/users/user.entity';
import { StatusUpdate } from 'src/status-updates/entities/status-update.entity';

@Injectable()
export class ResumesService {
  constructor(
    @InjectRepository(Resume)
    private resumesRepository: Repository<Resume>,
    private usersService: UsersService,
    private jobsService: JobsService,
    private dataSource: DataSource,
  ) {}
  async create(createResumeDto: CreateResumeDto, user: UserDTO) {
    const { email, id } = user;
    const status = 'PENDING';
    const creator = await this.usersService.findOne(id);
    const appliedJob = await this.jobsService.findOne(createResumeDto.jobId);

    const result = await this.resumesRepository.save({
      ...createResumeDto,
      email,
      status,
      user: creator,
      job: appliedJob,
      createdBy: creator,
      history: [{ status, updatedBy: creator }],
    });

    return { id: result.id, createdAt: result.createdAt };
  }

  async findAll(current: number, pageSize: number) {
    const defaultLimit = pageSize ? pageSize : 10;
    const offset = (current ? current : 1 - 1) * defaultLimit;

    const query = this.resumesRepository.createQueryBuilder('resume');

    const totalItems = (await query.getMany()).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const res = await query
      .leftJoinAndSelect('resume.user', 'user')
      .leftJoin('resume.job', 'job')
      .addSelect(['job.name'])
      .leftJoin('job.company', 'company')
      .addSelect(['company.name'])
      .leftJoinAndSelect('resume.history', 'statusUpdate')
      .leftJoinAndSelect('statusUpdate.updatedBy', 'userAlias')
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

  findOne(id: string) {
    return this.resumesRepository.findOneBy({ id });
  }

  async update(id: string, updateResumeDto: UpdateResumeDto, user: UserDTO) {
    const { status } = updateResumeDto;
    const updater = await this.usersService.findOne(user.id);
    const resume = await this.findOne(id);

    // save new status to status table
    const statusUpdateRepository = this.dataSource.getRepository(StatusUpdate);
    const newStatus = statusUpdateRepository.create({
      status,
      updatedBy: updater,
      resume,
    });
    await statusUpdateRepository.save(newStatus);

    // update status history for resume
    resume.status = status;
    resume.updatedBy = updater;
    resume.history.push(newStatus);
    const result = await this.resumesRepository.save(resume);

    return { id: result.id, updatedAt: result.updatedAt };
  }

  async remove(id: string, user: UserDTO) {
    const deleter = await this.usersService.findOne(user.id);
    await this.resumesRepository.update(id, {
      deletedBy: deleter,
    });

    return this.resumesRepository.softDelete(id);
  }

  findUserResume(user: UserDTO) {
    const query = this.resumesRepository.createQueryBuilder('resume');

    return query
      .leftJoin('resume.job', 'job')
      .addSelect(['job.name'])
      .where('resume.userId = :userId', { userId: user.id })
      .getMany();
  }
}
