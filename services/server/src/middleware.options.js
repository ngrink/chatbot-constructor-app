import fs from "fs";
import path from "path";
import * as globals from './globals';


export const helmet = {
    // contentSecurityPolicy: false,
    // crossOriginResourcePolicy: false,
    // crossOriginEmbedderPolicy: false,
}

export const slowDown = {
    windowMs: 60000,
    delayAfter: 25,
    delayMs: 250,
    maxDelayMs: 10000
}

export const rateLimit = {
    windowMs: 60000,
    max: 100,
    message: "Too many requests",
    standardHeaders: true,
	legacyHeaders: false,
}

export const morgan = {
    format: `:remote-addr :remote-user [:date[clf]] \":method :url HTTP/:http-version\" :status :res[content-length] :response-time ms`,
    settings: { stream: fs.createWriteStream("/srv/www/gigabot/volumes/server/logs/access.log", { flags: "a" }) },
}

export const cors = {
    "origin": [/^https:\/\/(.*\.)?gigabot\.app$/i, "http://localhost:3000"],
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "credentials": true,
    "maxAge": 3600 * 24,
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
}
