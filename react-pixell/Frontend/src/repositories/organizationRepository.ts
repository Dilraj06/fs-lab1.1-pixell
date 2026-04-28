const API = "http://localhost:4000/api";

export interface OrganizationRecord {
    id: number;
    firstName: string;
    lastName: string;
    role: string;
    department?: string;
}

export interface Role {
    employeeId: number;
    role: string;
}

export function organizationRepository() {
    return {
        async getOrganization(): Promise<OrganizationRecord[]> {
            const res = await fetch(`${API}/roles/organization`);
            if (!res.ok) {
                throw new Error("Failed to fetch organization");
            }
            return res.json();
        },

        async getRoles(): Promise<Role[]> {
            const res = await fetch(`${API}/roles`);
            if (!res.ok) {
                throw new Error("Failed to fetch roles");
            }
            return res.json();
        },

        async createRole(input: { employeeId: number; role: string }) {
            const res = await fetch(`${API}/roles`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(input),
            });

            if (!res.ok) {
                return res.json();
            }

            return res.json();
        },
    };
}