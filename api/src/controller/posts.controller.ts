import * as express from 'express';
import Controller from '../interface/controller.interface';
import Post from '../interface/post.interface';
import postModel from '../model/posts.model';
 
class PostsController implements Controller {
  public path = '/posts';
  public router = express.Router();
  private post = postModel;
 
  constructor() {
    this.initializeRoutes();
  }
 
  private initializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router.patch(`${this.path}/:id`, this.modifyPost);
    this.router.delete(`${this.path}/:id`, this.deletePost);
    this.router.post(this.path, this.createPost);
  }
 
  private getAllPosts = async (request: express.Request, response: express.Response) => {
    try {
      const posts = await this.post.find()
      response.status(200).json(posts);
    } catch (err) {
      response.status(404).json({message: err})
    }
  }
 
  private getPostById = async (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    try {
      const post = await this.post.findById(id)
      response.status(200).json(post);
    } catch (err) {
      response.status(404).json({message: err})
    }
  }
 
  private modifyPost = async (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    const postData: Post = request.body;
    try {
      const post = await this.post.findByIdAndUpdate(id, postData, { new: true })
      response.status(200).json(post);
    } catch (err) {
      response.status(404).json({message: err})
    }
  }
 
  private createPost = async (request: express.Request, response: express.Response) => {
    const postData: Post = request.body;
    const createdPost = new this.post(postData);
    try {
      const post = await createdPost.save()
      response.status(200).json(post);
    } catch (err) {
      response.status(404).json({message: err})
    }
  }
 
  private deletePost = async (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    try {
      await this.post.findByIdAndDelete(id)
      response.status(200).json({message: 'Bien Supprimé'});
    } catch (err) {
      response.status(404).json({message: err})
    }
  }
}
 
export default PostsController;