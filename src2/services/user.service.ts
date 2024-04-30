import { User } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';

class UserService {
  static getAllUsers(): User[] {
    // Implementation to get all users
    return UserRepository.getAllUsers();
  }

  static createUser(name: string, email: string): User {
    // Implementation to create a new user
    return UserRepository.createUser(name, email);
  }
}

export default UserService;
