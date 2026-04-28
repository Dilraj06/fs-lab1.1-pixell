import { Router } from "express";
import * as roleController from "../controllers/roleController";

const router = Router();

router.get("/", roleController.getRoles);
router.post("/", roleController.createRole);
router.get("/organization", roleController.getOrganization);

export default router;