import { Response } from 'express';
import Category, { ICategory } from '../models/Category';
import News from '../models/News';

export const getAllNewsAndAllCateogries = async (req: any, res: Response): Promise<any> => {
  try {
    const news = await News.find().populate('category', 'name');
    const categories = await Category.find();
    res.json({ news, categories });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategories = async (req: any, res: Response): Promise<any> => {
  try {
    const categories: ICategory[] = await Category.find();
    res.json(categories);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategoryById = async (req: any, res: Response): Promise<any> => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createCategory = async (req: any, res: Response): Promise<any> => {
  try {
    const { name, description } = req.body;
    const newCategory = new Category({ name, description });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error: any) {
    if (error.code === 11000) return res.status(400).json({ message: 'Category already exists' });
    res.status(400).json({ message: error.message });
  }
};

export const updateCategory = async (req: any, res: Response): Promise<any> => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCategory) return res.status(404).json({ message: 'Category not found' });
    res.json(updatedCategory);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCategory = async (req: any, res: Response): Promise<any> => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) return res.status(404).json({ message: 'Category not found' });
    res.json({ message: 'Category deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getNewsByCategory = async (req: any, res: Response): Promise<any> => {
  try {
    const news = await News.find({ category: req.params.id }).populate('category', 'name');
    if (!news || news.length === 0) return res.status(404).json({ message: 'No news found in this category' });
    res.json(news);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
