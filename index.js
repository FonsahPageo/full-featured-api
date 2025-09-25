import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

import authRouter from './routers/authRouter.js';
import postRouter from './routers/postRouter.js';

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Database connected');
    })
    .catch((err) => {
        console.log(err);
    });

app.use('/api/auth', authRouter);
app.use('/api/auth', postRouter);

app.get('/', (req, res) => {
    res.json({ message: 'Hello from the server' });
});

app.listen(process.env.PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});