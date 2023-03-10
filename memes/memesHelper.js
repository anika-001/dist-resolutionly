"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memeClassExport = void 0;
const axios_1 = require("axios");
const sentimentAnalysisHelper_1 = require("../sentimentAnalysis/sentimentAnalysisHelper");
const Keys_1 = require("../support/Keys");
const chatbot_1 = require("../chatbot/chatbot");
const FirebaseUtilities_1 = require("../ViewModels/FirebaseUtilities");
class memeClass {
    memeRequest() {
        const options = {
            method: 'GET',
            url: 'https://backend-omega-seven.vercel.app/api/getjoke',
        };
        return new Promise((resolve, reject) => {
            axios_1.default
                .request(options)
                .then(function (response) {
                const result = response.data;
                const firstElement = result[0];
                console.log(`firstElement ${firstElement}`);
                const joke = `${firstElement["question"]} \n ${firstElement["punchline"]}`;
                console.log(`joke ${joke}`);
                const staticImage = "https://cdn.hashnode.com/res/hashnode/image/upload/v1672516700017/a819c388-1860-4acb-ac02-2b9ab838931b.jpeg";
                const response_out = { "joke": joke, "image": staticImage };
                console.log(`response_out helper ${JSON.stringify(response_out)}`);
                resolve(response_out);
            })
                .catch(function (error) {
                console.error(`Error1 Occured - ${error}`);
                reject(error.toString());
            });
        });
    }
    returnJokeIfSadElseDialogflow(inputText, inputMobileNumber) {
        return new Promise((resolve, reject) => {
            console.log("Here I am ");
            console.log(`inputText  - ${inputText}`);
            const resolutionInputMatch = "resolution: ";
            const reminderInputMatch = "reminder: ";
            // console.log(string.includes(substring));  //true
            if (inputText.includes(resolutionInputMatch)) {
                const splittedStringArray = inputText.split(resolutionInputMatch);
                const resolutionInput = splittedStringArray[1];
                console.log(`splittedStringArray ${splittedStringArray[1]}`);
                FirebaseUtilities_1.firebaseUtilities.addResolution(inputMobileNumber, resolutionInput).then((res) => {
                    console.log(`Adding the Resolution ${resolutionInput} to DB`);
                }).catch((err) => {
                    reject(err);
                });
            }
            // if(inputText.includes(reminderInputMatch)){
            //     const splittedStringArray = inputText.split(reminderInputMatch);
            //     const reminderInput= splittedStringArray[1];
            //     console.log(`splittedStringArray ${splittedStringArray[1]}`);
            // }
            sentimentAnalysisHelper_1.default(inputText).then((response_out) => {
                console.log("Inside class");
                const compound_score = response_out;
                console.log(`compound_score ${compound_score}`);
                const finalResponse = {
                    joke: "",
                    image: "",
                    jokeAvailable: false,
                    response_from_dialogflow: ""
                };
                if (compound_score <= -0.2 && compound_score >= -1.0) {
                    this.memeRequest().then((response_out) => {
                        const jokeFetched = response_out;
                        finalResponse.joke = jokeFetched.joke;
                        finalResponse.image = jokeFetched.image;
                        finalResponse.jokeAvailable = true;
                        resolve(finalResponse);
                        // return finalResponse;
                    }).catch((err) => {
                        console.log(`Error Occured - ${err}`);
                        reject(err);
                    });
                }
                else {
                    this.getResponseFromDialogFlow(inputText).then(response_console_dialogflow => {
                        // console.log(`response_console_dialogflow ${response_console_dialogflow}`)
                        finalResponse.response_from_dialogflow = response_console_dialogflow;
                        resolve(finalResponse);
                    });
                }
            }).catch(function (error) {
                console.error(`Error2 Occured - ${error}`);
                reject(error);
            });
        });
    }
    getResponseFromDialogFlow(inputText) {
        const userId = Keys_1.keys.config.session_id;
        // console.log("Inside getResponseFromDialogFlow")
        return new Promise((resolve, reject) => {
            chatbot_1.default(inputText, userId).then((res) => {
                const resultQuery = res;
                const response_object = resultQuery[0];
                const response_console_dialogflow = {
                    "fulfillmentText": response_object.queryResult.fulfillmentText,
                };
                // console.log(`response_object ${JSON.stringify(response_object.queryResult)}`)
                resolve(response_console_dialogflow.fulfillmentText);
            }).catch(function (error) {
                console.error(`Error3 Occured - ${error}`);
                reject(error);
            });
        });
    }
}
// export default memeRequest;
exports.memeClassExport = new memeClass();
// export default {memeRequest,returnJokeIfSad} ;
//# sourceMappingURL=memesHelper.js.map