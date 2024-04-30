import { Request, Response, NextFunction } from 'express';

const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.header('x-user-id');
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized: Missing user ID' });
  }
  // Hardcoded check for admin user
  if (userId !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: User not authorized' });
  }
  next();
};

export default authenticationMiddleware;
