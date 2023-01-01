"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.examplecntrlr = void 0;
const express = require("express");
class ExampleCntrlr {
    /**
    * The method constructor. Constructor
    *
    */
    constructor() {
        this.router = express.Router();
        ExampleCntrlr.setRouterMiddleWare(this.router);
    }
    /**
    * The method setRouterMiddleWare.
    *
    * @param router of type express.Router
    * @returns void
    */
    static setRouterMiddleWare(router) {
        router.route('/greeting')
            .get(ExampleCntrlr.greeting);
    }
    static greeting(req, res) {
        var _a;
        let greeting = (_a = req.query.name) === null || _a === void 0 ? void 0 : _a.toString();
        res.status(200).send("Hello, " + greeting);
    }
}
exports.examplecntrlr = new ExampleCntrlr();
//# sourceMappingURL=ExampleCntrlr.js.map