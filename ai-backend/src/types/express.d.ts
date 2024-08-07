// src/types/express.d.ts
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      dbPool?: any; // Replace `any` with the actual type if known
    }
  }
}
