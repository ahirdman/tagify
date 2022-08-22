import { Request, Response, NextFunction } from 'express';

export const notFoundHandler = (
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  const message = {
    error: 'Resource not found',
  };

  response.status(404).json(message);
};
