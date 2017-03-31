import fs from "fs";
import winston from "winston";

class Logger extends winston.Logger {
    constructor (options) {
        super(options);

        if (!fs.existsSync("logs")) {
            fs.mkdirSync("logs");
        }
    }    
}

export default new Logger({
    transports: [
        new winston.transports.File({
            level: "info",
            filename: "logs/app.log",
            maxsize: 1048576,
            maxFile: 10,
            colorize: false
        })
    ]
});
