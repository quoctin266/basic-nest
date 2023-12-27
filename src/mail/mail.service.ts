import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'src/jobs/entities/job.entity';
import { Subscriber } from 'src/subscribers/entities/subscriber.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MailService {
  constructor(
    @InjectRepository(Subscriber)
    private subscribersRepository: Repository<Subscriber>,
    @InjectRepository(Job)
    private jobsRepository: Repository<Job>,
  ) {}
  async getMatchingJob() {
    const subscribers = await this.subscribersRepository.find();
    const result = await Promise.all(
      // find matching job for each subscriber
      subscribers.map(async (subscriber) => {
        const subSkills = subscriber.skills;
        const jobs = await this.jobsRepository
          .createQueryBuilder('job')
          .leftJoin('job.company', 'company')
          .select(['company.name', 'job'])
          .getMany();

        const matchJobs = jobs.filter((job) => {
          // return job if it has any skill included in subscriber's skills
          const match = job.skills.some((skill) => {
            return subSkills.includes(skill);
          });
          if (match) return job;
        });
        return {
          name: subscriber.name,
          email: subscriber.email,
          jobs: matchJobs,
        };
      }),
    );

    return result;
  }
}
