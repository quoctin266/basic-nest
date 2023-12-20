import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { Company } from '../companies/entities/company.entity';
import { User } from '../users/user.entity';
import { Role } from 'src/role/entities/role.entity';

export class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const companiessRepository = dataSource.getRepository(Company);
    const usersRepository = dataSource.getRepository(User);
    const rolesRepository = dataSource.getRepository(Role);

    const usersFactory = factoryManager.get(User);

    const companies = await companiessRepository.find();

    const users = await Promise.all(
      Array(10)
        .fill('')
        .map(async () => {
          const user = await usersFactory.make({
            company: faker.helpers.arrayElement(companies),
            role: await rolesRepository.findOneBy({ name: 'USER' }),
          });
          return user;
        }),
    );

    const noCompanyUsers = await Promise.all(
      Array(10)
        .fill('')
        .map(async () => {
          const user = await usersFactory.make({
            role: await rolesRepository.findOneBy({ name: 'USER' }),
          });
          return user;
        }),
    );
    await usersRepository.save([...users, ...noCompanyUsers]);
  }
}
