import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();

router.post("/login", AuthController.loginHandle)
router.post("/refreshToken", AuthController.refreshTokenHandle)

export const authRoute = router;