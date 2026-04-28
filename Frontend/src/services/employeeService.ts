import type { Department, Employee } from "../repositories/employeeRepo";

type CreateEmployeePayload = {
    departmentId: number;
    firstName: string;
    lastName: string;
};

type CreateEmployeeResult = {
    ok?: boolean;
    message?: string;
    errors?: {
        departmentId?: string[];
        firstName?: string[];
        lastName?: string[];
    };
};

export function employeeService() {
    return {
        async getEmployees(): Promise<Employee[]> {
            const response = await fetch("http://localhost:4000/api/employees");

            if (!response.ok) {
                throw new Error("Failed to fetch employees");
            }

            return response.json();
        },

        async getDepartments(): Promise<Department[]> {
            const response = await fetch("http://localhost:4000/api/employees/departments");

            if (!response.ok) {
                throw new Error("Failed to fetch departments");
            }

            return response.json();
        },

        async createEmployee(
            input: CreateEmployeePayload,
            token?: string | null
        ): Promise<CreateEmployeeResult> {
            const response = await fetch("http://localhost:4000/api/employees", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(input),
            });

            return response.json();
        },
    };
}