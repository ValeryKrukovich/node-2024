import { User } from '../models/user.model';

class UserRepository {
  private static users: User[] = [];

  static getAllUsers(): User[] {
    return this.users;
  }

  static createUser(name: string, email: string): User {
    const newUser: User = {
      id: this.generateUserId(),
      name,
      email,
    };
    this.users.push(newUser);
    return newUser;
  }

  private static generateUserId(): string {
    // Implementation to generate unique user ID
    return 'generated-user-id';
  }
}

export default UserRepository;
