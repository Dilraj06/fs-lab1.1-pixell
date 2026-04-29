const API = "http://localhost:4000/api";

export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    departmentId: number;
}

export interface Department {
    id: number;
    name: string;
    employees: Employee[];
}

export function employeeRepo() {
    return {
        async getEmployees(): Promise<Employee[]> {
            const res = await fetch("https://fs-lab1-1-pixell.onrender.com/api/employees");
            if (!res.ok) {
                throw new Error("Failed to fetch employees");
            }
            return res.json();
        },

        async getDepartments(): Promise<Department[]> {
            const res = await fetch(`${API}/employees/departments`);
            if (!res.ok) {
                throw new Error("Failed to fetch departments");
            }
            return res.json();
        },

        async createEmployee(input: {
            departmentId: number;
            firstName: string;
            lastName: string;
        }) {
            const res = await fetch(`${API}/employees`, {
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