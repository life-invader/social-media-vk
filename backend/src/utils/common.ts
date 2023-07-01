import { ClassConstructor, plainToInstance } from 'class-transformer';

export const createDTO = <T, V>(dto: ClassConstructor<T>, plainObject: V) => {
  return plainToInstance(dto, plainObject, {excludeExtraneousValues: true});
};
