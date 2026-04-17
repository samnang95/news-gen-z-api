import express from 'express';
import { protect, adminOnly } from '../middleware/authMiddleware';
import { 
  getNews, 
  getNewsById, 
  getNewsByCategory, 
  createNews, 
  updateNews, 
  deleteNews 
} from '../controllers/newsController';

const router = express.Router();

router.get('/', protect, getNews);
router.get('/:id', protect, getNewsById);
router.get('/category/:categoryId', protect, getNewsByCategory);
router.post('/', protect, adminOnly, createNews);
router.put('/:id', protect, adminOnly, updateNews);
router.delete('/:id', protect, adminOnly, deleteNews);

export default router;
