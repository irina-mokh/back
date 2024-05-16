import * as bcrypt from 'bcrypt';

export const hash = async (str: string) => {
  console.log(str);
  return await bcrypt.hash(str, Number(process.env.CRYPT_SALT || '10'));
};
