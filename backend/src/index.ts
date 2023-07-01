// import 'reflect-metadata'
import { Application } from './app/application.js';
import { ExceptionFilter } from './common/exceprion-filter/exception-filter.js';
import { Config } from './config/config.js';
import { DBClient } from './database-client/database.service.js';
import { UserController } from './modules/users/user.controller.js';
import { UserService } from './modules/users/user.service.js';

// Common
const config = new Config();
const dbClient = new DBClient();
const exceptionFilter = new ExceptionFilter();

// User
const userService = new UserService();
const userController = new UserController(userService);
const app = new Application(config, dbClient, userController, exceptionFilter);
app.init();
