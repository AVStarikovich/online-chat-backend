import Utils from './utils';

import User from '../models/user';

export default new class UserService extends Utils{
  constructor() { super() }

  async createUser({ username, password }) {
    let user = await new User({ username }).save();
    user.password = this.utils.createHmac(password);
    return user.save();
  }
}

