import { departments } from "../data/departments";
import { roles } from "../data/roles";

export function getOrganizationData() {
    return departments.flatMap((department) =>
        department.employees.map((employee) => {
            const matchingRole = roles.find((role) => role.employeeId === employee.id);

            return {
                id: employee.id,
                firstName: employee.firstName,
                lastName: employee.lastName,
                department: department.name,
                role: matchingRole ? matchingRole.role : "Employee",
            };
        })
    );
}

export function getAllRoles() {
    return roles;
}

export function createRole(employeeId: number, role: string) {
    const existingRole = roles.find((item) => item.employeeId === employeeId);

    if (existingRole) {
        existingRole.role = role;
        return existingRole;
    }

    const newRole = { employeeId, role };
    roles.push(newRole);
    return newRole;
}