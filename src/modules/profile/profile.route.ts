import { Router} from "express";
import { ProfileController } from "./profile.controller";

const router = Router()

router.post("/createProfile", ProfileController.createProfile )

export const profileRoute = router;