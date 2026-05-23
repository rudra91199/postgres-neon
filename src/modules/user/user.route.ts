import { Router} from "express";

import { UserController } from "./user.controller";
import auth  from "../../middleware/auth";
import { USER_ROLE } from "../../types";

const router = Router()


router.get("/",auth(USER_ROLE.ADMIN, USER_ROLE.AGENT), UserController.getAllUsers);

router.post("/createUser",UserController.createUser);

router.get("/getUserById/:id", UserController.getUserById);

router.put("/updateUser/:id", UserController.updateUser);

router.delete("/deleteUser/:id",UserController.deleteUser);


export const userRoute = router;

