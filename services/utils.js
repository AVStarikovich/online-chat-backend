import crypto from 'crypto';

import config from '../config';

export default new class Utils {
  createHmac(data) {
    let hmac = crypto.createHmac('sha256', config.server.secret);
    return hmac.update(data).digest('hex');
  };
}

