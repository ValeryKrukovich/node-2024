import { Request, Response } from 'express';
import AuthService from '../services/auth.service';

class AuthController {
  static async signUp(req: Request, res: Response) {
    const { email, password, role } = req.body;
    try {
      const user = await AuthService.signUp(email, password, role);
      res.status(201).json({ data: user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async signIn(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const { token, user } = await AuthService.signIn(email, password);
      res.status(200).json({ token, user });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}

export default AuthController;
