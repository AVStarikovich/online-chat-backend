import userService from '../services/user';
import errors from '../services/errors';

import BaseController from './base.controller';

export default new class UserController extends BaseController {
  constructor() { super() }

  async register(req, res, next) {
    try {
      req.checkBody('username').notEmpty();
      req.checkBody('password').notEmpty();

      await this.getValidationResult(req);
      let user = await userService.createUser(req.body);
      req.dataOut = this.getFields(user, { of: 'user' });
      next();
    } catch(err) { next(errors.user.default.ex(err)) }
  }
}
