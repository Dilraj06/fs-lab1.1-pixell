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
    try {
        const res = await fetch("https://fs-lab1-1-pixell.onrender.com/api/employees");

        if (!res.ok) throw new Error("Backend failed");

        return await res.json();
    } catch (error) {
        return [
            { id: 1, firstName: "John", lastName: "Smith", departmentId: 1 },
            { id: 2, firstName: "Sara", lastName: "Brown", departmentId: 2 },
            { id: 3, firstName: "David", lastName: "Wilson", departmentId: 3 },
            { id: 4, firstName: "Emily", lastName: "Davis", departmentId: 1 },
        ];
    }
}

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