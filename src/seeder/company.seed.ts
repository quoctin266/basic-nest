import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { Company } from '../companies/entities/company.entity';
import { User } from '../users/user.entity';

export class CompanySeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const companiessRepository = dataSource.getRepository(Company);
    const usersRepository = dataSource.getRepository(User);

    const companiessFactory = factoryManager.get(Company);

    const users = await usersRepository.find();

    const companies = await Promise.all(
      Array(10)
        .fill('')
        .map(async () => {
          const created = await companiessFactory.make({
            createdBy: faker.helpers.arrayElement(users),
          });
          return created;
        }),
    );
    await companiessRepository.save(companies);
  }
}
