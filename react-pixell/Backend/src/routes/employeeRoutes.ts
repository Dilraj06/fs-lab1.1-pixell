import { Router } from "express";
import * as employeeController from "../controllers/employeeController";

const router = Router();

router.get("/", employeeController.getEmployees);
router.get("/departments", employeeController.getDepartments);
router.post("/", employeeController.createEmployee);

export default router;