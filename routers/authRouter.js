import express from 'express';
import { signup, signin, signout, sendVerificationCode } from '../controllers/authControllers.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', signout);
router.patch('/send-verification-code', sendVerificationCode);

export default router;