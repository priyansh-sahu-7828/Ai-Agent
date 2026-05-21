// src/shared/middleware/errorHandler.ts
import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError.js';

export const errorHandler = (
  err: Error, _req: Request, res: Response, _next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false, message: err.message, code: err.code
    });
  }
  console.error('[unhandled]', err);
  res.status(500).json({ success: false, message: 'Internal server error' });
};