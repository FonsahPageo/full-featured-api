import express from 'express';
import { identifier } from '../middlewares/identification.js';
import { createPost, allPosts, singlePost} from '../controllers/postController.js';

const postRouter = express.Router();

postRouter.post('/create-post', identifier, createPost);
postRouter.get('/all-posts', allPosts);
postRouter.get('/single-post', singlePost);

// postRouter.put('/update-post', identifier, sendVerificationCode);
// postRouter.delete('/delete-post', identifier, verifyVerificationCode);

export default postRouter;