import { CreateUserDto } from './dto/create-user.dto.js';
import type { UserDocument } from './user.schema.js';

export interface IUserService {
  create: (dto: CreateUserDto) => Promise<UserDocument>;
}
