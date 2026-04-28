export type OrganizationEmployee = {
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

export type OrganizationDepartment = {
    id: string;
    name: string;
    employees: OrganizationEmployee[];
};

export type Role = {
    id: string;
    title: string;
};

export function organizationService() {
    return {
        async getOrganization(): Promise<OrganizationDepartment[]> {
            const response = await fetch("http://localhost:4000/api/organization");

            if (!response.ok) {
                throw new Error("Failed to fetch organization data");
            }

            return response.json();
        },

        async getRoles(): Promise<Role[]> {
            const response = await fetch("http://localhost:4000/api/organization/roles");

            if (!response.ok) {
                throw new Error("Failed to fetch roles");
            }

            return response.json();
        },

        async createRole(payload: { title: string }, token?: string | null) {
            const response = await fetch("http://localhost:4000/api/organization/roles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(payload),
            });

            return response.json();
        },

        async deleteRole(id: string, token?: string | null) {
            const response = await fetch(`http://localhost:4000/api/organization/roles/${id}`, {
                method: "DELETE",
                headers: {
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
            });

            return response.json();
        }
    };
}