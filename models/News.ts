import mongoose, { Document, Schema } from 'mongoose';

export interface INews extends Document {
  title: string;
  content: string;
  author: string;
  imageUrl?: string;
  category: mongoose.Types.ObjectId; // References the Category model
  createdAt: Date;
  updatedAt: Date;
}

const newsSchema: Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: 'Anonymous'
  },
  imageUrl: {
    type: String,
    required: false
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',  // This exactly matches the 'Category' model name
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model<INews>('News', newsSchema);
