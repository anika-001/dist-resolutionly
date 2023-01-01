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
const sentimentAnalysisHelper_1 = require("../sentimentAnalysis/sentimentAnalysisHelper");
const sentimentAnalysisRoute = express_1.Router();
sentimentAnalysisRoute.post('/analyse', (req, res) => {
    if (req.method === 'POST') {
        const { inputText } = req.body;
        sentimentAnalysisHelper_1.default(inputText).then((response_out) => {
            const compound_score = response_out;
            return res.status(200).json({ "compound": compound_score });
        }).catch(function (error) {
            console.error(`Error4 Occured - ${error}`);
            return res.status(400);
        });
    }
    else {
        return res.status(400);
    }
});
sentimentAnalysisRoute.get('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    return response.json("OK");
}));
exports.default = sentimentAnalysisRoute;
//# sourceMappingURL=sentimentAnalysis.routes.js.map