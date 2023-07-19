import { Router } from "express";
import { checkUser } from "../controller/AuthController.js";

const router = Router();

router.post("/check-user", checkUser);

export default router;
