import mongoose from 'mongoose';

import appConfig from '../config';

mongoose.Promise = Promise;

mongoose.connect(appConfig.mongodb.url);

export default mongoose.connection;
