import { employeeRepo } from "../repositories/employeeRepo";

export function employeeService() {
    const repo = employeeRepo();

    return {
        getEmployees() {
            return repo.getEmployees();
        },
        getDepartments() {
            return repo.getDepartments();
        },

        createEmployee(input: {
            departmentId: number;
            firstName: string;
            lastName: string;
        }) {
            const errors: { departmentId?: string[]; firstName?: string[] } = {};

            const dept = repo.getDepartmentById(input.departmentId);
            if (!dept) errors.departmentId = ["Department does not exist."];

            if (input.firstName.trim().length < 3) {
                errors.firstName = ["First Name must be at least 3 characters."];
            }

            const ok = Object.keys(errors).length === 0;
            if (!ok) return { ok: false as const, errors };

            const created = repo.createEmployee(input.departmentId, {
                firstName: input.firstName.trim(),
                lastName: input.lastName.trim(),
            });

            return { ok: true as const, employee: created };
        },
    };
}