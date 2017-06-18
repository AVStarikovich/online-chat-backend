import * as mongoose from 'mongoose';

import * as config from '../config';

mongoose.Promise = Promise;

mongoose.connect(config.mongodb.url);

export default mongoose.connection;
