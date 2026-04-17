import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123';

// 1. REGISTER
router.post('/register', async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create and save user
    const newUser = new User({ username, email, passwordHash });
    const savedUser = await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// 2. LOGIN
router.post('/login', async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user: IUser | null = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Validate password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT Token
    // We put the user's ID inside the payload
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // Send token and basic user info to the client
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// 3. LOGOUT
router.post('/logout', (req: Request, res: Response) => {
  // Since we use JWT tokens sent in Headers, the server doesn't actually store standard sessions.
  // The client (React/Vue/etc) just needs to delete the token from its local storage.
  res.json({ message: 'Logged out successfully. Please delete your token on the frontend.' });
});

export default router;
