import express, { Express, NextFunction, Request, Response } from 'express';
import { UserController } from '../modules/users/user.controller.js';
import type { ConfigInterface } from '../config/config.interface.js';
import type { IDBClient } from '../database-client/database.interface.js';
import type { ExceptionFilterInterface } from '../common/exceprion-filter/exception-filter.interface.js';

export class Application {
  config: ConfigInterface;
  dbClient: IDBClient;
  userController: UserController;
  exceptionFilter: ExceptionFilterInterface;
  expressApp: Express = express();

  constructor(
    config: ConfigInterface,
    dbClient: IDBClient,
    userController: UserController,
    exceptionFilter: ExceptionFilterInterface,
  ) {
    this.config = config;
    this.dbClient = dbClient;
    this.userController = userController;
    this.exceptionFilter = exceptionFilter;
  }

  connectRouters() {
    this.expressApp.use('/users', this.userController.router);
  }

  connectMiddleware() {
    this.expressApp.use(express.json());
  }

  connectErrorHandlers() {
    this.expressApp.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  async init() {
    await this.dbClient.connect(this.config.get('DB_URL'));

    this.connectMiddleware();
    this.connectRouters();
    this.connectErrorHandlers();

    this.expressApp.listen(this.config.get('PORT'));
    console.log('App started!');
  }
}
