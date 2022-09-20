import {Request, Response} from "express";

export const notFoundHandler = (
    _request: Request,
    response: Response,
) => {
  const message = {
    error: "Resource not found",
  };

  response.status(404).json(message);
};
