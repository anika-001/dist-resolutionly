"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.whatsApp = void 0;
const memesHelper_1 = require("../memes/memesHelper");
const whatsapp_send_message_js_1 = require("../support/whatsapp-send-message.js");
class WhatsAppUtilities {
    respond(mymessage, senderID) {
        return new Promise((resolve, reject) => {
            memesHelper_1.memeClassExport.returnJokeIfSadElseDialogflow(mymessage).then(res => {
                var response = "";
                if (res.jokeAvailable) {
                    response = res.joke;
                }
                else {
                    response = res.response_from_dialogflow;
                }
                whatsapp_send_message_js_1.waHelperFunc.sendMessage(response, senderID).then(res => {
                    resolve(null);
                })
                    .catch(err => {
                    reject(err);
                });
            })
                .catch(err => {
                reject(err);
            });
        });
    }
}
exports.whatsApp = new WhatsAppUtilities();
//# sourceMappingURL=WhatsAppUtilities.js.map