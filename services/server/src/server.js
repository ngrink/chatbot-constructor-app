import path from "path";
import express from "express";
import mongoose from "mongoose";
// Middlewares
import enforceSSL from "express-enforces-ssl";
import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";
import useragent from "express-useragent";
import methodOverride from "method-override";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import * as globals from './globals';
import * as options from "./middleware.options";
import { sequelize } from "./utils/lib/sequelize/";
import { router } from "./server.router";
import { errorHandler } from "./error.handler";
import "./models.associations";


const app = express();
app.enable('trust proxy');

app.use(methodOverride('_method'));
app.use(helmet(options.helmet));
app.use(cors(options.cors));
// app.use(slowDown(options.slowDown))
// app.use(rateLimit(options.rateLimit))
app.use(morgan('combined'));
app.use(morgan(options.morgan.format, options.morgan.settings));
app.use(compression());
app.use(express.static(path.join(globals.__dirname, "..", "..", "client", "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(useragent.express());
app.use(cookieParser());
app.use("/api/:version/status", (req, res) => res.json("Gigabot server is running"));
app.use("/api/:version", router);
app.use(errorHandler);



(async function main() {
  // try {
  //   await mongoose.connect(process.env.MONGO_ACCESS, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //   }, (error) => {
  //     error
  //       ? console.log(`[Mongo]`, error)
  //       : console.log(`[Mongo] Connected to MongoDB`);
  //   });
  // } catch (e) {
  //   console.log(`[DBM] `, e)
  // }

  try {
    await sequelize.sync({ alter: true });
    console.log('[Postgres] Connected to PostgreSQL');
  } catch (e) {
    console.error('[Postgres] Unable to connect to the database:', e);
  }

  try {
    const PORT = process.env.SERVICE_PORT || 5000;
    app.listen(PORT, error => {
      error
        ? console.log(`[Server]`, error)
        : console.log(`[Server] Server is running on PORT ${PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
}());
