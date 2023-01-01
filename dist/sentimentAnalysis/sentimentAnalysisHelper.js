"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const Keys_1 = require("../support/Keys");
const sentimentAnalysisHelper = (inputText) => {
    const options = {
        method: 'POST',
        url: 'https://text-analysis12.p.rapidapi.com/sentiment-analysis/api/v1.1',
        headers: {
            'content-type': 'application/json',
            'x-rapidapi-host': 'text-analysis12.p.rapidapi.com',
            'x-rapidapi-key': Keys_1.keys.config.NEXT_PUBLIC_RAPIDAPI_KEY
        },
        data: { language: 'english', text: inputText }
    };
    return new Promise((resolve, reject) => {
        axios_1.default
            .request(options).then(function (response) {
            const result = response.data;
            const compound_score = result.aggregate_sentiment.compound;
            resolve(compound_score);
        }).catch(function (error) {
            console.error(`Error Occured - ${error}`);
            reject(error);
        });
    });
};
exports.default = sentimentAnalysisHelper;
//# sourceMappingURL=sentimentAnalysisHelper.js.map