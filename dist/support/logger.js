"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class Logger {
    log(message, timeStamp, type = "INFO") {
        var date = new Date();
        var fullDate = date.getDate().toString() + "-" + date.getMonth().toString() + "-" + date.getFullYear().toString();
        var data = `${timeStamp}: [${type}] - ${message} \n`;
        fs.appendFile("./src/logs/" + fullDate + ".log", data, function (err) {
            if (err)
                throw err;
        });
    }
}
let logger = new Logger();
exports.default = logger;
//# sourceMappingURL=logger.js.map