import express from "express";

import { AuthMiddleware } from "#auth";
import { ChannelController } from './channel.controller';


const router = express.Router({mergeParams: true});

router.get("/",
  [AuthMiddleware.authorized],
  ChannelController.getProjectChannels
)

router.post("/",
  [AuthMiddleware.authorized],
  ChannelController.addChannel
)

// TODO: add updateChannel functionality
// router.patch("/",
//   [AuthMiddleware.authorized],
//   ChannelController.updateChannel
// )

router.delete("/:channelId",
  [AuthMiddleware.authorized],
  ChannelController.removeChannel
)

router.post("/:channelId/enable",
  [AuthMiddleware.authorized],
  ChannelController.enableChannel
)

router.post("/:channelId/disable",
  [AuthMiddleware.authorized],
  ChannelController.disableChannel
)

export { router as ChannelRouter }
