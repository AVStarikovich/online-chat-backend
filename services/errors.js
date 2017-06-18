import * as _ from 'lodash';

let errList = {
  api: {
    default: {
      code: 1000,
      description: 'internal api error'
    }
  },
  user: {
    default: {
      code: 2000,
      description: 'user error'
    },
    not_found: {
      code: 2001,
      description: 'user not found'
    }
  }
};

/**
 * Assign original error
 * @param {object} ob
 * @param {object} originalError
 * @return {Object}
 */
const extendError = (ob, originalError) => {
  return _.extend(ob, {originalError: originalError});
};

/**
 * Assign handle to each error
 * @param {object} errObj
 */
const assignEx = errObj => {
  errObj['ex'] = originalError => {
    return extendError(errObj, originalError);
  };
  errObj['mongoErr'] = err => {
    if (err.name === 'MongoError') {
      return {
        code: errObj.code,
        description: err.errmsg
      };
    }
  };
  errObj['withVar'] = data => {
    return {
      code: errObj.code,
      description: errObj.description.replace(/\|var\|/gi, data)
    };
  };
};

/**
 * Init assign
 * @param {object} object
 */
const deepAssign = object => {
  _.each(object, (val) => {
    if (_.isObject(val) || _.isArray(val)) {
      deepAssign(val);
    }
  });
  assignEx(object);
};

deepAssign(errList);

export default errList;
