import { User } from '../models/user.model';

class UserRepository {
  static async getAllUsers() {
    return User.find();
  }

  static async createUser(name: string, email: string) {
    const user = new User({ id: this.generateUserId(), name, email });
    return user.save();
  }

  private static generateUserId(): string {
    // Implementation to generate unique user ID
    return 'generated-user-id';
  }
}

export default UserRepository;
