import express from 'express';
import { protect, adminOnly } from '../middleware/authMiddleware';
import { getAllUsers, updateUser, deleteUser } from '../controllers/userController';

const router = express.Router();

router.get('/', protect, adminOnly, getAllUsers);
router.put('/:id', protect, adminOnly, updateUser);
router.delete('/:id', protect, adminOnly, deleteUser);

export default router;
