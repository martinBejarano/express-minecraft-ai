import './config/config.ts';

import express from 'express';
import passport from 'passport';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import './config/passport.ts';
import helmet from 'helmet';
import morgan from 'morgan';
import { aiRoutes } from './routes/index.js';

const app = express();

app.use(cors({
  origin: "*",
  credentials: true,
}));

app.use(helmet());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/ai', aiRoutes);

// Database connection
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});