import { User } from 'src/users/user.entity';
import { hashPassword } from 'src/util/util.function';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(User, async (faker) => {
  const user = new User();
  user.username = faker.internet.userName();
  user.email = faker.internet.email({ provider: 'gmail.com' });
  user.password = await hashPassword('123456');
  user.phone = faker.helpers.fromRegExp('0[1-9]{9}');
  user.age = faker.number.int({ min: 18, max: 60 });

  return user;
});
