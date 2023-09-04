import express from "express";

import { AccountRouter } from "#accounts";
import { AuthRouter } from "#auth";
import { ProjectRouter } from "#projects";
import { ConfigRouter } from "#configs";
import { ChannelRouter } from "#channels";
import { CoreRouter } from "#core";
import { UserRouter } from "#users";
import { DialogRouter } from "#dialogs";


const router = express.Router({mergeParams: true});

router
  .use("/accounts", AccountRouter)
  .use("/auth", AuthRouter)
  .use("/projects", ProjectRouter)
  .use("/projects/:projectId/config", ConfigRouter)
  .use("/projects/:projectId/channels", ChannelRouter)
  .use("/projects/:projectId/users", UserRouter)
  .use("/projects/:projectId/dialogs", DialogRouter)
  // .use("/projects/:projectId/statistics", StatisticsRouter)
  // .use("/projects/:projectId/integrations", IntegrationsRouter)
  // .use("/projects/:projectId/settings", SettingsRouter)
  .use("/core", CoreRouter);

export { router }
