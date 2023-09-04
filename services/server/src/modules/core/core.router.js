import express from "express";

import { CoreMiddleware } from "./core.middleware";
import { CoreController } from "./core.controller";


const router = express.Router();

router.get("/channels",
  [CoreMiddleware.coreOnly],
  CoreController.getEnabledChannels
);

router.get("/configs",
  [CoreMiddleware.coreOnly],
  CoreController.getAllConfigs
);

router.get("/configs/:configId",
  [CoreMiddleware.coreOnly],
  CoreController.getConfigById
);

router.get("/projects/:projectId/config",
  [CoreMiddleware.coreOnly],
  CoreController.getConfig
)

router.post("/newMessage",
  [CoreMiddleware.coreOnly],
  CoreController.handleNewMessage
)


export { router as CoreRouter }
