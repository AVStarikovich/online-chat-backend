import utils from './utils';

import User from '../models/user';

export default new class UserService{
  async createUser({ username, password }) {
    let user = new User({ username });
    user.password = utils.createHmac(password);
    return user.save();
  }
}

