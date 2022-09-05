import express from 'express';
import morgan from 'morgan';
import middleware from '../middleware';
import contactsRouter from './routes/contacts';

const app = express();

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combine' : 'dev'));
}

app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.use(middleware.errorHandler);

export default app;
