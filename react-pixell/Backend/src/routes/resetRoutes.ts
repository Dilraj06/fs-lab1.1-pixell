import { Router } from "express";
import { resetApp } from "../controllers/resetController";

const router = Router();

router.post("/", resetApp);

export default router;