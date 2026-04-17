import {
    createEmployee as createEmployeeInRepo,
    createRole as createRoleInRepo,
    getAllRoles,
    getOrganizationData,
} from "../repositories/organizationRepository.js";

export async function getOrganization() {
    return getOrganizationData();
}

export async function fetchOrganization() {
    return getOrganizationData();
}

export async function getRoles() {
    return getAllRoles();
}

export async function fetchRoles() {
    return getAllRoles();
}

export async function createRole(title: string) {
    return createRoleInRepo(title);
}

export async function addRole(title: string) {
    return createRoleInRepo(title);
}

export async function createEmployee(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    departmentId: string;
    roleId: string;
}) {
    return createEmployeeInRepo(data);
}

export async function addEmployee(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    departmentId: string;
    roleId: string;
}) {
    return createEmployeeInRepo(data);
}