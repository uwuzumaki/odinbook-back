import { Router } from "express";
import registration from "../controllers/registrationController.js";

const router = Router();

router.post("/", registration);

export default router;
