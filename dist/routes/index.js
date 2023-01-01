"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatbot_routes_1 = require("./chatbot.routes");
const WhatsApp_routes_1 = require("./WhatsApp.routes");
const sentimentAnalysis_routes_1 = require("./sentimentAnalysis.routes");
const memes_routes_1 = require("./memes.routes");
const routes = express_1.Router();
// Activate user routes
routes.use('/chatbot', chatbot_routes_1.default);
routes.use('/v1/whatsAppBot', WhatsApp_routes_1.default.router);
routes.use('/sentimentAnalysis', sentimentAnalysis_routes_1.default);
routes.use('/meme', memes_routes_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map