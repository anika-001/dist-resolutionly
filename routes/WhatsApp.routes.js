"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const whatsapp_send_message_js_1 = require("../support/whatsapp-send-message.js");
const logger_1 = require("../support/logger");
const WhatsAppUtilities_1 = require("../ViewModels/WhatsAppUtilities");
class WhatsAppRoutes {
    constructor() {
        this.router = express.Router();
        WhatsAppRoutes.setRouterMiddleWare(this.router);
    }
    /**
    * The method setRouterMiddleWare.
    *
    * @param router of type express.Router
    * @returns void
    */
    static setRouterMiddleWare(router) {
        router.route('/try')
            .get(WhatsAppRoutes.try);
        router.route('/whatsapp')
            .post(WhatsAppRoutes.response);
    }
    static try(req, res) {
        logger_1.default.log("Hit try", new Date().toString());
        whatsapp_send_message_js_1.waHelperFunc.sendMessage("Hello", "whatsapp:+919987994940")
            .then(response => {
            logger_1.default.log(`/try responded ${response}`, new Date().toString(), "SUCCESS");
            res.status(200).send("Hello, " + response);
        })
            .catch(err => {
            logger_1.default.log(`/try failed with error ${err}`, new Date().toString(), "ERROR");
            res.status(500).send("Error" + err);
        });
    }
    static response(req, res) {
        WhatsAppUtilities_1.whatsApp.respond(req.body.body, req.body.From).then(response => {
            res.status(200);
        })
            .catch(err => {
            res.status(500).send("Error" + err);
        });
    }
}
var whatsAppRoutes = new WhatsAppRoutes();
exports.default = whatsAppRoutes;
//# sourceMappingURL=WhatsApp.routes.js.map