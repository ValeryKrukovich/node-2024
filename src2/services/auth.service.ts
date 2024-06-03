import { User } from '../models/user.model';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret';
const JWT_EXPIRATION = '2h';

class AuthService {
  static async signUp(email: string, password: string, role: 'admin' | 'user') {
    const user = new User({ email, password, role });
    await user.save();
    return user;
  }

  static async signIn(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    return { token, user };
  }

  static verifyToken(token: string) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (e) {
      throw new Error('Invalid token');
    }
  }
}

export default AuthService;
