import { Router } from "express";
import {
    addEmployee,
    addRole,
    fetchOrganization,
    fetchRoles,
} from "../services/organizationService.js";

const router = Router();

router.get("/organization", async (_req, res) => {
    try {
        const data = await fetchOrganization();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch organization data", error });
    }
});

router.get("/roles", async (_req, res) => {
    try {
        const data = await fetchRoles();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch roles", error });
    }
});

router.post("/roles", async (req, res) => {
    try {
        const { title } = req.body;

        if (!title || !String(title).trim()) {
            return res.status(400).json({ message: "Role title is required" });
        }

        const role = await addRole(String(title));
        res.status(201).json(role);
    } catch (error) {
        res.status(500).json({ message: "Failed to create role", error });
    }
});

router.post("/employees", async (req, res) => {
    try {
        const { firstName, lastName, email, phone, departmentId, roleId } = req.body;

        if (!firstName || !lastName || !email || !departmentId || !roleId) {
            return res.status(400).json({ message: "Missing required employee fields" });
        }

        const employee = await addEmployee({
            firstName,
            lastName,
            email,
            phone,
            departmentId,
            roleId,
        });

        res.status(201).json(employee);
    } catch (error) {
        res.status(500).json({ message: "Failed to create employee", error });
    }
});

export default router;