import express from 'express';
import { protect, adminOnly } from '../middleware/authMiddleware';
import { 
  getCategories, 
  getCategoryById, 
  createCategory, 
  updateCategory, 
  deleteCategory 
} from '../controllers/categoryController';

const router = express.Router();

router.get('/', protect, getCategories);
router.get('/:id', protect, getCategoryById);
router.post('/', protect, adminOnly, createCategory);
router.put('/:id', protect, adminOnly, updateCategory);
router.delete('/:id', protect, adminOnly, deleteCategory);

export default router;
