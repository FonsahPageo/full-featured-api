import express from 'express';
import { identifier } from '../middlewares/identification.js';
import { getPosts, createPost } from '../controllers/postController.js';

const postRouter = express.Router();

postRouter.get('/all-posts', getPosts);
// postRouter.get('/single-post', signin);
postRouter.post('/create-post', identifier, createPost);

// postRouter.put('/update-post', identifier, sendVerificationCode);
// postRouter.delete('/delete-post', identifier, verifyVerificationCode);

export default postRouter;