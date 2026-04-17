import { Response } from 'express';
import News, { INews } from '../models/News';

export const getNews = async (req: any, res: Response): Promise<any> => {
  try {
    const news: INews[] = await News.find().populate('category').sort({ createdAt: -1 });
    res.json(news);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getNewsById = async (req: any, res: Response): Promise<any> => {
  try {
    const newsItem = await News.findById(req.params.id).populate('category');
    if (!newsItem) return res.status(404).json({ message: 'News not found' });
    res.json(newsItem);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getNewsByCategory = async (req: any, res: Response): Promise<any> => {
  try {
    const news = await News.find({ category: req.params.categoryId }).populate('category');
    res.json(news);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createNews = async (req: any, res: Response): Promise<any> => {
  try {
    const newNews = new News(req.body);
    const savedNews = await newNews.save();
    res.status(201).json(savedNews);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateNews = async (req: any, res: Response): Promise<any> => {
  try {
    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedNews) return res.status(404).json({ message: 'News not found' });
    res.json(updatedNews);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteNews = async (req: any, res: Response): Promise<any> => {
  try {
    const deletedNews = await News.findByIdAndDelete(req.params.id);
    if (!deletedNews) return res.status(404).json({ message: 'News not found' });
    res.json({ message: 'News deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
