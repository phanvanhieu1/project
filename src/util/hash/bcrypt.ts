import * as bcrypt from 'bcrypt';


// const salt=process.env.SALT || 10;
export function encodePassword(password: any): Promise<any> {
    const salt=bcrypt.genSaltSync();
  return bcrypt.hash(password, salt);
}

export function comparePassword(password: any, hash: any): Promise<any> {
  return bcrypt.compare(password, hash);
}