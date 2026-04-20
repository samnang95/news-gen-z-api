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

router.get('/', getCategories);
router.get('/all', getAllNewsAndAllCateogries);
router.get('/:id', getCategoryById);
router.get('/:id/news', getNewsByCategory);
router.post('/', protect, adminOnly, createCategory);
router.put('/:id', protect, adminOnly, updateCategory);
router.delete('/:id', protect, adminOnly, deleteCategory);

export default router;
