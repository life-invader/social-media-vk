import { NextFunction, Request, Response } from 'express';

export type RouteHandlerType = (req: Request, res: Response, next: NextFunction) => void;
