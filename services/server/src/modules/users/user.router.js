import express from "express";

import { AuthMiddleware } from "#auth";
import { UserController } from './user.controller';


const router = express.Router({mergeParams: true});

router.get("/",
  [AuthMiddleware.authorized],
  UserController.getProjectUsers
)

// router.post("/",
//   [AuthMiddleware.authorized],
//   UserController.createUser
// )

export { router as UserRouter }
