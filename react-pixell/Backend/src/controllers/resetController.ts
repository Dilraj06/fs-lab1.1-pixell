import type { Request, Response } from "express";
import { resetDepartments } from "../data/departments";
import { resetRoles } from "../data/roles";

export function resetApp(_req: Request, res: Response) {
    resetDepartments();
    resetRoles();

    res.json({ message: "Application reset to initial state" });
}