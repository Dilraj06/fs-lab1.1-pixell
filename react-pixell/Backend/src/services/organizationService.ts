import {
    createEmployee,
    createRole,
    getAllRoles,
    getOrganizationData,
} from "../repositories/organizationRepository.js";

export async function fetchOrganization() {
    return getOrganizationData();
}

export async function fetchRoles() {
    return getAllRoles();
}

export async function addRole(title: string) {
    return createRole(title.trim());
}

export async function addEmployee(payload: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    departmentId: string;
    roleId: string;
}) {
    return createEmployee({
        ...payload,
        firstName: payload.firstName.trim(),
        lastName: payload.lastName.trim(),
        email: payload.email.trim().toLowerCase(),
        phone: payload.phone?.trim() || undefined,
    });
}