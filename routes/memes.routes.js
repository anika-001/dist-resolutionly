"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import {memeRequest, returnJokeIfSad} from '../memes/memesHelper';
// import {memeRequest} from '../memes/memesHelper';
// import returnJokeIfSad from '../memes/memesHelper';
const memesHelper_1 = require("../memes/memesHelper");
const meme = express_1.Router();
meme.get('/getRandom', (req, res) => {
    if (req.method === 'GET') {
        // memeClassExport()
        memesHelper_1.memeClassExport.memeRequest().then((response_out) => {
            console.log(`response_out ${JSON.stringify(response_out)}`);
            return res.status(200).json(response_out);
        }).catch((err) => {
            console.log(`Error Occured - ${err}`);
            return res.status(400);
        });
    }
    else {
        return res.status(400);
    }
});
// For testing of the made function
meme.post('/returnJokeIfSadElseDialogflow', (req, res) => {
    if (req.method === 'POST') {
        const { inputText, inputMobileNumber } = req.body;
        console.log(`inputText ${inputText}`);
        memesHelper_1.memeClassExport.returnJokeIfSadElseDialogflow(inputText, inputMobileNumber).then((response_out) => {
            console.log(`response_out ${JSON.stringify(response_out)}`);
            return res.status(200).json(response_out);
        }).catch((err) => {
            console.log(`Error Occured - ${err}`);
            return res.status(400);
        });
    }
    else {
        return res.status(400);
    }
});
exports.default = meme;
//# sourceMappingURL=memes.routes.js.map