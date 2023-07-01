import bcrypt from 'bcrypt';

export function hashPassword(password: string) {
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, salt);
  return passwordHash;
}

export function comparePassword(password: string, hashPassword: string) {
  return bcrypt.compareSync(password, hashPassword);
}
