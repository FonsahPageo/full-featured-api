import express from 'express';
import {
    signup, signin, signout, sendVerificationCode,
    verifyVerificationCode, changePassword,
    sendForgotPasswordCode, verifyForgotPasswordCode
} from '../controllers/authControllers.js';
import { identifier } from '../middlewares/identification.js';

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/signin', signin);
authRouter.post('/signout', identifier, signout);

authRouter.patch('/send-verification-code', identifier, sendVerificationCode);
authRouter.patch('/verify-verification-code', identifier, verifyVerificationCode);

authRouter.patch('/change-password', identifier, changePassword);
authRouter.patch('/send-forgot-password-code', identifier, sendForgotPasswordCode);
authRouter.patch('/verify-forgot-password-code', identifier, verifyForgotPasswordCode);

export default authRouter;