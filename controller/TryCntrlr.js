"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trycntrlr = void 0;
const express = require("express");
const FirebaseUtilities_1 = require("../ViewModels/FirebaseUtilities");
class TryCntrlr {
    /**
    * The method constructor. Constructor
    *
    */
    constructor() {
        this.router = express.Router();
        TryCntrlr.setRouterMiddleWare(this.router);
    }
    /**
    * The method setRouterMiddleWare.
    *
    * @param router of type express.Router
    * @returns void
    */
    static setRouterMiddleWare(router) {
        router.route('/')
            .get(TryCntrlr.try);
    }
    static try(req, res) {
        // let greeting: String = req.query.name?.toString()!;
        console.log("Hit try");
        FirebaseUtilities_1.firebaseUtilities.addResolution("+919987994940", "Hi I am resolution")
            .then(ress => {
            res.status(200).send("Hello, ");
        })
            .catch(err => {
            res.status(500).send("Error" + err);
        });
        console.log("done try");
        // res.status(200).send("Hello");
    }
}
exports.trycntrlr = new TryCntrlr();
//# sourceMappingURL=TryCntrlr.js.map