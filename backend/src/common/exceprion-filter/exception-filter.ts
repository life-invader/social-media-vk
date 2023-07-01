import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { HttpError } from './http-error-handler.js';
import type { ExceptionFilterInterface } from './exception-filter.interface.js';

export class ExceptionFilter implements ExceptionFilterInterface {
  catch(err: Error | HttpError, _req: Request, res: Response, _next: NextFunction) {
    console.error('Oops');

    if (err instanceof HttpError) {
      this.handleHttpError(err, res);
      return;
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }

  handleHttpError(err: HttpError, res: Response) {
    res.status(err.statusCode).send({ error: err.message });
  }
}
