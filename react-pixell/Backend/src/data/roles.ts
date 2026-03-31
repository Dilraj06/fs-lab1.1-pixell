import type { Role } from "../models/role";

export const initialRoles: Role[] = [
    { employeeId: 1, role: "Customer Service" },
    { employeeId: 2, role: "IT Support" },
    { employeeId: 3, role: "Loans" },
];

export let roles: Role[] = structuredClone(initialRoles);

export function resetRoles() {
    roles = structuredClone(initialRoles);
}