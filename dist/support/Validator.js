"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
class Validator {
    /**
    * The method init. Initialize the validator
    *
    * @returns void
    */
    static init() {
        // openAPIValidator.init(path.join(__dirname, '..', '..', 'static', 'openapi3.json'));
    }
    /**
    * The method preValidate.
    *
    * @returns void
    */
    static preValidate() {
    }
    /**
    * The method validate.
    *
    * @param req of type express.Request
    * @param res of type express.Response
    * @param next of type express.NextFunction
    * @returns void
    */
    static validate(req, res, next) {
        // Validator.preValidate();
        // openAPIValidator.validate(req, res, next);
        next();
    }
}
exports.Validator = Validator;
//Validator.init();
//# sourceMappingURL=Validator.js.map