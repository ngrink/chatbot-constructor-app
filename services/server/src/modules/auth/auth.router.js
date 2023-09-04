import express from "express";

import { AuthController } from './auth.controller';
import { AuthMiddleware } from './auth.middleware';


const router = express.Router();

router.post("/login",
  AuthController.login
)

router.post("/logout",
  [AuthMiddleware.authorized],
  AuthController.logout
)
router.post("/refresh",
  AuthController.refreshTokens
)

export { router as AuthRouter }
