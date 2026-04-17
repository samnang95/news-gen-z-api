import { Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';

export const getAllUsers = async (req: any, res: Response): Promise<any> => {
  try {
    const users = await User.find().select('-passwordHash');
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req: any, res: Response): Promise<any> => {
  try {
    const { username, email, password } = req.body;
    
    let updateData: any = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.passwordHash = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    ).select('-passwordHash');

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    
    res.json(updatedUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req: any, res: Response): Promise<any> => {
  try {
    if (req.user.id === req.params.id) {
       return res.status(400).json({ message: 'Error: You cannot delete your own admin account.' });
    }

    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    
    res.json({ message: 'User deleted successfully from the database.' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
