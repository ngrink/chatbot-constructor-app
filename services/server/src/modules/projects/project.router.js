import express from "express";

import { AuthMiddleware } from '../auth/auth.middleware';
import { ProjectMiddleware } from './project.middleware';
import { ProjectController } from './project.controller';


const router = express.Router();

router.post("/",
  [AuthMiddleware.authorized],
  ProjectController.createProject
);

router.get("/",
  [AuthMiddleware.authorized],
  ProjectController.getAccountProjects
);

router.get("/:projectId",
  [AuthMiddleware.authorized,
  ProjectMiddleware.projectOwner],
  ProjectController.getProject
);

router.patch("/:projectId",
  [AuthMiddleware.authorized,
  ProjectMiddleware.projectOwner],
  ProjectController.updateProject
);

router.delete("/:projectId",
  [AuthMiddleware.authorized,
  ProjectMiddleware.projectOwner],
  ProjectController.deleteProject
);


export { router as ProjectRouter }
