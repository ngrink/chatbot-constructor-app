import express from "express";

import { AuthMiddleware } from "#auth";
import { AccountController } from './account.controller';


const router = express.Router();

router.post("/",
  AccountController.createAccount
)

// router.get("/:id",
//   AccountController.getAccount
// )

// router.patch("/:id",
//   AccountController.updateAccount
// )

// router.delete("/:id",
//   AccountController.deleteAccount
// )

router.get("/activate/:token",
  AccountController.activateAccount
)

router.post("/resetpass",
  AccountController.passwordResetRequest
)

router.post("/resetpass/:token",
  AccountController.passwordReset
)

router.post("/changepass",
  [AuthMiddleware.authorized],
  AccountController.passwordChange
)


export { router as AccountRouter }
