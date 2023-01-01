"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerAPI = void 0;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const helmet = require("helmet");
const path = require("path");
const bodyParser = require("body-parser");
const routes_1 = require("./routes");
const openapi_validator_middleware_1 = require("openapi-validator-middleware");
const appConfig_1 = require("./support/appConfig");
const ExampleCntrlr_1 = require("./controller/ExampleCntrlr");
const TryCntrlr_1 = require("./controller/TryCntrlr");
class ServerAPI {
    /**
    * The method constructor. Constructor
    *
    */
    constructor() {
        this.apiApp = express();
        this.port = process.env.PORT || appConfig_1.configuration.webport;
        this.apiApp.disable('x-powered-by');
        this.apiApp.disable('etag');
    }
    /**
    * The method start.
    *
    * @returns Promise<void>
    */
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            const server = this.apiApp.listen(this.port, () => {
                console.log(`------------API Web Server Starting on port ${this.port} -------------`);
            });
        });
    }
    /**
    * The method setMiddleware.
    *
    * @returns void
    */
    setMiddleware() {
        this.apiApp.use(helmet());
        this.apiApp.use(cors({
            origin: ['http://localhost:4200', 'http://127.0.0.1:4200', 'http://localhost:4400', 'http://localhost:5001', 'https://fundle-f51a5.web.app'],
            credentials: true
        }));
        this.apiApp.use(bodyParser.urlencoded({ extended: false }));
        this.apiApp.use(bodyParser.json());
        this.apiApp.use(cookieParser());
        this.apiApp.use(express.json());
        this.apiApp.use(express.urlencoded({ 'extended': true }));
        this.apiApp.use(express.static(path.join(__dirname, '..', 'static')));
        this.apiApp.use(routes_1.default);
    }
    /**
    * The method setRouterMiddleWare.
    *
    * @returns void
    */
    setRouterMiddleWare() {
        this.apiApp.use('/v1/example', ExampleCntrlr_1.examplecntrlr.router);
        this.apiApp.use('/v1/try', TryCntrlr_1.trycntrlr.router);
        this.apiApp.use((err, req, res, next) => {
            if (err instanceof openapi_validator_middleware_1.InputValidationError) {
                return res.status(400).json({ more_info: JSON.stringify(err.errors) });
            }
        });
    }
}
exports.ServerAPI = ServerAPI;
const api = new ServerAPI();
api.setMiddleware();
api.setRouterMiddleWare();
api.start();
//# sourceMappingURL=ServerAPI.js.map