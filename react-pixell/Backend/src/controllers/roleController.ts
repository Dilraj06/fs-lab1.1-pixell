import type { Request, Response } from "express";
import * as organizationService from "../services/organizationService";

export function getRoles(_req: Request, res: Response) {
    const roles = organizationService.getRoles();
    res.json(roles);
}

export function getOrganization(_req: Request, res: Response) {
    const organization = organizationService.getOrganization();
    res.json(organization);
}

export function createRole(req: Request, res: Response) {
    try {
        const { employeeId, role } = req.body;

        const newRole = organizationService.addRole(Number(employeeId), role);

        res.status(201).json(newRole);
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Failed to create role";

        res.status(400).json({ message });
    }
}