import { Request, Response, Router } from 'express';
import { UserService } from './user.service.js';
import { Controller } from '../../common/controller.abstract.js';
import { HttpMethod } from '../../types/http-methods.type.js';
import { HttpError } from '../../common/exceprion-filter/http-error-handler.js';
import { StatusCodes } from 'http-status-codes';
import { createDTO } from '../../utils/common.js';
import { UserResponseDto } from './dto/user-response.dto.js';

export class UserController extends Controller {
  userService: UserService;

  constructor(userService: UserService) {
    super();
    this.userService = userService;

    this.registerRoute(HttpMethod.Post, '/register', this.register);
    this.registerRoute(HttpMethod.Post, '/login', this.login);
  }

  login() {}

  async register(req: Request, res: Response) {
    const existingUser = await this.userService.findByEmail(req.body.email);

    if (existingUser) {
      throw new HttpError(StatusCodes.CONFLICT, `User with ${req.body.email} already exists`);
    }

    const result = await this.userService.create(req.body);
    res.json(createDTO(UserResponseDto, result));
  }
}
