import express from 'express';
import { identifier } from '../middlewares/identification.js';
import { createPost, allPosts, singlePost, updatePost, deletePost} from '../controllers/postController.js';

const postRouter = express.Router();

postRouter.post('/create-post', identifier, createPost);
postRouter.get('/all-posts', allPosts);
postRouter.get('/single-post', singlePost);

postRouter.put('/update-post', identifier, updatePost);
postRouter.delete('/delete-post', identifier, deletePost);

export default postRouter;