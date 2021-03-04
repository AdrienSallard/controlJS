import * as mongoose from 'mongoose';
import Post from '../interface/post.interface';
 
const postSchema = new mongoose.Schema({
  author: String,
  content: String,
  title: String,
}, {timestamps: true});
 
const postModel = mongoose.model<Post & mongoose.Document>('Post', postSchema);
 
export default postModel;