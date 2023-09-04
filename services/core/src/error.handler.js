import fs from 'fs';
import path from 'path';


// const errorStream = fs.createWriteStream(
//   path.join(process.env.PWD, "..", "error.log"), { flags: "a" }
// )

function errorHandler(err, req, res, next) {
    // errorStream.write(JSON.stringify(err) + "\n\n");

    console.log('[UNHANDLED ERROR]', err);
    res.status(500).json({message: "Internal server error"})
}

export { errorHandler };
