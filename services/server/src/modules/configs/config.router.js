import express from "express";

import { AuthMiddleware } from "#auth";
import { ProjectMiddleware } from "#projects";
import { ConfigController } from './config.controller';

import { FaqRouter } from "./database/faq";


const router = express.Router({mergeParams: true});

router.get("/",
  [AuthMiddleware.authorized,
  ProjectMiddleware.projectOwner],
  ConfigController.getConfig
);

// TODO: distribute the update logic into separate submodules and functions
router.patch("/",
  [AuthMiddleware.authorized,
  ProjectMiddleware.projectOwner],
  ConfigController.updateConfig
);

router.post("/publish",
  [AuthMiddleware.authorized,
  ProjectMiddleware.projectOwner],
  ConfigController.publishConfig
);

// Config Subroutes
// router.use("/flows",
//   [AuthMiddleware.authorized,
//   ProjectMiddleware.projectOwner],
//   FlowsRouter
// );

// router.use("/nlu",
//   [AuthMiddleware.authorized,
//   ProjectMiddleware.projectOwner],
//   NluRouter
// );

router.use("/database/faq",
  [AuthMiddleware.authorized,
  ProjectMiddleware.projectOwner],
  FaqRouter
);

// router.use("/newsletters",
//   [AuthMiddleware.authorized,
//   ProjectMiddleware.projectOwner],
//   NewslettersRouter
// );

export { router as ConfigRouter }
