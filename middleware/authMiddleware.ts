import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123';

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction): any => {
  // Client sends token in header like: "Bearer eyy..."
  const token = req.header('Authorization')?.split(' ')[1]; 

  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Adds user info to req object
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Middleware to check if user is strictly an Administrator
export const adminOnly = (req: AuthRequest, res: Response, next: NextFunction): any => {
  if (req.user && req.user.role === 'admin') {
    next(); // They are admin, let them through
  } else {
    // 403 Forbidden
    return res.status(403).json({ message: 'Access denied. Administrators only.' }); 
  }
};
