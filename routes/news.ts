import express, { Request, Response } from 'express';
import News, { INews } from '../models/News';

const router = express.Router();

// 1. GET ALL NEWS (And automatically fetch the Category data alongside it!)
router.get('/', async (req: Request, res: Response): Promise<any> => {
  try {
    // The .populate('category') method tells MongoDB to swap the random category ID string 
    // with the actual Category Object data (like name and description).
    const news: INews[] = await News.find().populate('category').sort({ createdAt: -1 });
    res.json(news);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// 2. GET NEWS BY SPECIFIC CATEGORY ID
router.get('/category/:categoryId', async (req: Request, res: Response): Promise<any> => {
  try {
    const news = await News.find({ category: req.params.categoryId }).populate('category');
    res.json(news);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// 3. CREATE NEWS
router.post('/', async (req: Request, res: Response): Promise<any> => {
  try {
    const newNews = new News(req.body);
    const savedNews = await newNews.save();
    res.status(201).json(savedNews);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
