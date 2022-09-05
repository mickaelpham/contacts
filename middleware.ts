import express from "express";

const errorHandler = (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  res.status(500).json({ error: err.message });
};

const middleware = { errorHandler };
export default middleware;
