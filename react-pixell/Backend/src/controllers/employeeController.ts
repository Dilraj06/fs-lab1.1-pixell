import type { Request, Response } from "express";
import { employeeService } from "../services/employeeService";

export function getEmployees(_req: Request, res: Response) {
    const service = employeeService();
    const employees = service.getEmployees();

    res.json(employees);
}

export function getDepartments(_req: Request, res: Response) {
    const service = employeeService();
    const departments = service.getDepartments();

    res.json(departments);
}

export function createEmployee(req: Request, res: Response) {
    const service = employeeService();

    const result = service.createEmployee({
        departmentId: Number(req.body.departmentId),
        firstName: req.body.firstName ?? "",
        lastName: req.body.lastName ?? "",
    });

    if (!result.ok) {
        res.status(400).json(result);
        return;
    }

    res.status(201).json(result);
}