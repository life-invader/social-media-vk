import { NextFunction, Request, Response, Router } from 'express';
import { HttpMethod } from '../types/http-methods.type.js';
import type { RouteHandlerType } from '../types/route-handler.type.js';

export abstract class Controller {
  readonly router: Router;

  constructor() {
    this.router = Router();
  }

  asyncErrorHandler(fn: Function) {
    return (req: Request, res: Response, next: NextFunction) => {
      return Promise.resolve(fn(req, res, next)).catch(next);
    };
  }

  registerRoute(method: HttpMethod, route: string, handler: RouteHandlerType) {
    this.router[method](route, this.asyncErrorHandler(handler.bind(this)));
  }
}
