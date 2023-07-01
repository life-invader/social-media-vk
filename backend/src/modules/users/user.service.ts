import { CreateUserDto } from './dto/create-user.dto.js';
import { UserModel } from './user.schema.js';
import type { IUserService } from './user.interface.js';

export class UserService implements IUserService {
  async create(dto: CreateUserDto) {
    const user = new UserModel(dto);
    user.hashPassword();
    const result = await user.save();

    console.log(`User ${result.email} created!`);
    return result;
  }

  async findByEmail(email: string) {
    return UserModel.findOne({ email });
  }
}
