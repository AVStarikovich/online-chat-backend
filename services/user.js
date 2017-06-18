import utils from './utils';
import errors from './errors';

import User from '../models/user';

export default new class UserService{
  async createUser({ username, password }) {
    let user = new User({ username });
    user.password = utils.createHmac(password);
    return user.save();
  }

  async findUserByUsername(username) {
    let user = await User.findOne({ username });
    if (!user) {
      throw errors.user.not_found;
    }
    return user;
  }
}

