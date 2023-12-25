import { Injectable } from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { UserDTO } from 'src/users/users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscriber } from './entities/subscriber.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/user.service';

@Injectable()
export class SubscribersService {
  constructor(
    @InjectRepository(Subscriber)
    private subscribersRepository: Repository<Subscriber>,
    private usersService: UsersService,
  ) {}

  async create(createSubscriberDto: CreateSubscriberDto, user: UserDTO) {
    const creator = await this.usersService.findOne(user.id);
    const result = await this.subscribersRepository.insert({
      ...createSubscriberDto,
      createdBy: creator,
    });

    return result.generatedMaps[0];
  }

  async findAll(current: number, pageSize: number) {
    const defaultLimit = pageSize ? pageSize : 10;
    const offset = (current ? current : 1 - 1) * defaultLimit;

    const query = this.subscribersRepository.createQueryBuilder('subscriber');

    const totalItems = (await query.getMany()).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const res = await query
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
    return `This action returns a #${id} subscriber`;
  }

  async update(
    id: string,
    updateSubscriberDto: UpdateSubscriberDto,
    user: UserDTO,
  ) {
    const updater = await this.usersService.findOne(user.id);
    return this.subscribersRepository.update(id, {
      ...updateSubscriberDto,
      updatedBy: updater,
    });
  }

  async remove(id: string, user: UserDTO) {
    const deleter = await this.usersService.findOne(user.id);
    await this.subscribersRepository.update(id, {
      deletedBy: deleter,
    });

    return this.subscribersRepository.softDelete(id);
  }
}
