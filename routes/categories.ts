import express from 'express';
import { protect, adminOnly } from '../middleware/authMiddleware';
import { 
  getCategories, 
  getCategoryById, 
  createCategory, 
  updateCategory, 
  deleteCategory,
  getNewsByCategory,
  getAllNewsAndAllCateogries
} from '../controllers/categoryController';

const router = express.Router();

router.get('/', protect, getCategories);
router.get('/all', protect, getAllNewsAndAllCateogries);
router.get('/:id', protect, getCategoryById);
router.get('/:id/news', protect, getNewsByCategory);
router.post('/', protect, adminOnly, createCategory);
router.put('/:id', protect, adminOnly, updateCategory);
router.delete('/:id', protect, adminOnly, deleteCategory);

export default router;
