"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dialogflow_1 = require("@google-cloud/dialogflow");
const Keys_1 = require("../support/Keys");
const sessionClient = new dialogflow_1.SessionsClient({ credentials: Keys_1.keys.config });
const textQuery = (userText, userId) => {
    const sessionPath = sessionClient.projectAgentSessionPath(Keys_1.keys.config.project_id, Keys_1.keys.config.session_id + userId);
    const request_test = {
        session: sessionPath,
        queryInput: {
            text: {
                text: userText,
                languageCode: Keys_1.keys.config.languageCode
            }
        }
    };
    return new Promise((resolve, reject) => {
        sessionClient.detectIntent(request_test).then((res) => {
            resolve(res);
        }).catch((err) => {
            console.log(`Error Occured - ${err}`);
            reject(err);
        });
    });
};
exports.default = textQuery;
//# sourceMappingURL=chatbot.js.map