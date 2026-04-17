import express, { Request, Response } from 'express';
import Category, { ICategory } from '../models/Category';

const router = express.Router();

// 1. GET ALL CATEGORIES
router.get('/', async (req: Request, res: Response): Promise<any> => {
  try {
    const categories: ICategory[] = await Category.find();
    res.json(categories);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// 2. CREATE A NEW CATEGORY
router.post('/', async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, description } = req.body;
    const newCategory = new Category({ name, description });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error: any) {
    // 11000 is the MongoDB duplicate key error code (if they create the same category twice)
    if (error.code === 11000) return res.status(400).json({ message: 'Category already exists' });
    res.status(400).json({ message: error.message });
  }
});

// 3. DELETE A CATEGORY
router.delete('/:id', async (req: Request, res: Response): Promise<any> => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) return res.status(404).json({ message: 'Category not found' });
    res.json({ message: 'Category deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
