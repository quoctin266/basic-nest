import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { Company } from '../companies/entities/company.entity';
import { User } from '../users/user.entity';
import { hashPassword } from 'src/util/util.function';
import { Role } from 'src/role/entities/role.entity';

export class CompanySeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const companiessRepository = dataSource.getRepository(Company);
    const usersRepository = dataSource.getRepository(User);
    const rolesRepository = dataSource.getRepository(Role);

    const companiessFactory = factoryManager.get(Company);

    await rolesRepository.insert([
      {
        name: 'USER',
        description: 'normal user',
        isActive: true,
      },
      {
        name: 'ADMIN',
        description: 'system admin',
        isActive: true,
      },
    ]);

    await usersRepository.insert({
      username: 'admin',
      email: 'admin@gmail.com',
      password: await hashPassword('123456'),
      role: await rolesRepository.findOneBy({ name: 'ADMIN' }),
    });

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
