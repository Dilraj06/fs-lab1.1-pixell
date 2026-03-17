import * as organizationRepository from "../repositories/organizationRepository";

export function getOrganization() {
    return organizationRepository.getOrganizationData();
}

export function getRoles() {
    return organizationRepository.getAllRoles();
}

export function addRole(employeeId: number, role: string) {
    if (!employeeId || Number.isNaN(employeeId)) {
        throw new Error("Valid employeeId is required");
    }

    if (!role || !role.trim()) {
        throw new Error("Role is required");
    }

    return organizationRepository.createRole(employeeId, role.trim());
}