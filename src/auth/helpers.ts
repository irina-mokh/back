import * as bcrypt from 'bcrypt';

export const hash = async (str: string) => {
  return await bcrypt.hash(str, Number(process.env.CRYPT_SALT || '10'));
};
