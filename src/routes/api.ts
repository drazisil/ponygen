import {  Request, Response } from "express";

// define the home route
export function apiHome (req: Request, res: Response): void {
  res.send('API birds')
}
