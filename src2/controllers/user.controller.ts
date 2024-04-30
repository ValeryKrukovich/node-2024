import { Request, Response } from 'express';
import UserService from '../services/user.service';

class UserController {
  static getAllUsers(req: Request, res: Response) {
    const users = UserService.getAllUsers();
    res.status(200).json({ data: users });
  }

  static createUser(req: Request, res: Response) {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    const user = UserService.createUser(name, email);
    res.status(201).json({ data: user });
  }
}

export default UserController;
