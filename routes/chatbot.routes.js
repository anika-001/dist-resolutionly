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
const express_1 = require("express");
const chatbot_1 = require("../chatbot/chatbot");
const chatBot = express_1.Router();
chatBot.post('/text_query', (request, response) => {
    const { text, userId } = request.body;
    chatbot_1.default(text, userId).then((res) => {
        const resultQuery = res;
        const response_object = resultQuery[0];
        const response_console = {
            "responseId": response_object.responseId,
            "queryText:": response_object.queryResult.queryText,
            "action": response_object.queryResult.action,
            "allRequiredParamsPresent": response_object.queryResult.allRequiredParamsPresent,
            "fulfillmentText": response_object.queryResult.fulfillmentText,
        };
        return response.json(response_console);
    });
});
chatBot.get('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    return response.json("OK");
}));
exports.default = chatBot;
//# sourceMappingURL=chatbot.routes.js.map