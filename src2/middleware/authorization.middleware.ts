import { Request, Response, NextFunction } from 'express';

const adminAuthorizationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};

export default adminAuthorizationMiddleware;
