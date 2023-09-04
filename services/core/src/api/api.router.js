import express from "express";
import { APIController } from "./api.controller";
export const router = express.Router();


router.post("/channels/:channelId/connect", APIController.connectChannel)
router.post("/channels/:channelId/disconnect", APIController.disconnectChannel)
router.post("/config/:configId/publish", APIController.updateConfig)
