import fs from 'fs';
import path from 'path';

import { ApiError } from './api.exceptions';


const errorStream = fs.WriteStream(
  "/srv/www/gigabot/volumes/server/error.log", { flags: "a" }
)

function errorHandler(err, req, res, next) {
    errorStream.write(JSON.stringify(err) + "\n");

    if (err instanceof ApiError) {
        return res
            .status(err.status)
            .json({
                message: err.message,
                errors: err.errors
            })
    }

    console.log('[UNHANDLED ERROR]', err);
    res.status(500).json({message: "Internal server error"})
}

export { errorHandler };
