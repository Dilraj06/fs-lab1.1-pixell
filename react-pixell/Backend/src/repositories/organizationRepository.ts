import { prisma } from "../lib/prisma.js";

type OrganizationEmployee = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    roleId: string;
    roleTitle: string;
    departmentId: string;
    deptName: string;
};

type OrganizationDepartment = {
    id: string;
    name: string;
    employees: OrganizationEmployee[];
};

export async function getOrganizationData(): Promise<OrganizationDepartment[]> {
    const departments = await prisma.department.findMany({
        include: {
            employees: {
                include: {
                    role: true,
                },
            },
        },
        orderBy: {
            name: "asc",
        },
    });

    const result: OrganizationDepartment[] = [];

    for (const department of departments) {
        const employees: OrganizationEmployee[] = [];

        for (const employee of department.employees) {
            employees.push({
                id: employee.id,
                firstName: employee.firstName,
                lastName: employee.lastName,
                email: employee.email,
                phone: employee.phone,
                roleId: employee.roleId,
                roleTitle: employee.role.title,
                departmentId: department.id,
                deptName: department.name,
            });
        }

        result.push({
            id: department.id,
            name: department.name,
            employees,
        });
    }

    return result;
}

export async function getAllRoles() {
    return prisma.role.findMany({
        orderBy: {
            title: "asc",
        },
    });
}

export async function createRole(title: string) {
    return prisma.role.create({
        data: {
            title: title.trim(),
        },
    });
}

export async function createEmployee(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    departmentId: string;
    roleId: string;
}) {
    return prisma.employee.create({
        data: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone ?? null,
            departmentId: data.departmentId,
            roleId: data.roleId,
        },
        include: {
            department: true,
            role: true,
        },
    });
}