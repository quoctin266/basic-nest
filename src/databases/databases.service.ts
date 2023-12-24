import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/role/entities/role.entity';
import { User } from 'src/users/user.entity';
import { DataSource, Repository } from 'typeorm';
import { runSeeders } from 'typeorm-extension';

@Injectable()
export class DatabasesService implements OnModuleInit {
  private readonly logger = new Logger(DatabasesService.name);

  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}
  async onModuleInit() {
    const countRole = (await this.rolesRepository.find()).length;
    const countUser = (await this.usersRepository.find()).length;

    if (countRole === 0 && countUser === 0) {
      await runSeeders(this.dataSource);
      this.logger.log('Run seeding successfully');
    } else this.logger.log('No seeding were run');
  }
}
