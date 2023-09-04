import express from "express";

import { AuthMiddleware } from "#auth";
import { DialogController } from './dialog.controller';


const router = express.Router({mergeParams: true});

router.get("/",
  [AuthMiddleware.authorized],
  DialogController.getProjectDialogs
)

export { router as DialogRouter }
