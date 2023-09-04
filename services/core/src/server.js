import "dotenv/config";
import express from "express";

import { router } from "./api/api.router";
import { errorHandler } from "./error.handler.js";
import { Core } from "./core";


const app = express();
app.enable('trust proxy');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);
app.use(errorHandler);


async function main() {
    try {
        app.listen(process.env.PORT, error => {
          error
            ? console.log(`[Server]`, error)
            : console.log(`[Server] Server is running on PORT ${process.env.PORT}`);
        });

        await Core.run(error => {
            error
              ? console.log(`[Core]`, error)
              : console.log(`[Core] Core is running`);
        });
    } catch (e) {
      console.log(e);
    }
}

main();
