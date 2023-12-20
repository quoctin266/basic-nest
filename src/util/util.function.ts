import { compare, genSalt, hash } from 'bcryptjs';

export const hashPassword = async (password: string) => {
  const salt = await genSalt(10);
  const hashPW = await hash(password, salt);
  return hashPW;
};

export const checkPassword = async (hash: string, password: string) => {
  return await compare(password, hash);
};
