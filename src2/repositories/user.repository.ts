// import { User } from '../models/user.model';

// class UserRepository {
//   static async getAllUsers() {
//     return User.find();
//   }

//   static async createUser(name: string, email: string) {
//     const user = new User({ id: this.generateUserId(), name, email });
//     return user.save();
//   }

//   private static generateUserId(): string {
//     // Implementation to generate unique user ID
//     return 'generated-user-id';
//   }
// }

// export default UserRepository;

import { getRepository } from 'typeorm';
import { User } from '../entities/User';

export class UserRepository {
  private userRepository = getRepository(User);

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: string): Promise<User | undefined> {
    return this.userRepository.findOne(id);
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
