import express from 'express';

const errorHandler = (
  err: Error,
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (res.headersSent) {
    next(err);
    return;
  }

  res.status(500).json({ error: err.message });
};

const middleware = { errorHandler };
export default middleware;
