export class BaseController{
  getValidationResult(req) {
    return req.getValidationResult()
      .then(result => {
        if (!result.isEmpty()) {
          throw result.mapped();
        }
      })
  }

  /**
   * Return object with set fields
   *
   * @param {Instance<someModel>} model
   * @param {object} config
   * @returns {object}
   */
  getFields(model, config) {
    let result = {};

    if (config.of) {
      switch(config.of) {
        case 'user':
          ['username', 'created', 'lastActivity'].forEach(field => {
            if (model[field]) {
              result[field] = model[field];
            }
          });

          return result;
          break;
        default:
          console.error(new Error('Invalid using getFields method'));
          return model;
          break;
      }
    }

    if (config.fields) {
      config.fields.forEach(field => {
        if (model[field]) {
          result[field] = model[field];
        }
      });

      return result;
    }
  }
}
