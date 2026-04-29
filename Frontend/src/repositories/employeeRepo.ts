const API = "https://fs-lab1-1-pixell.onrender.com/api";

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

const fallbackEmployees: Employee[] = [
  { id: 1, firstName: "John", lastName: "Smith", departmentId: 1 },
  { id: 2, firstName: "Sara", lastName: "Brown", departmentId: 2 },
  { id: 3, firstName: "David", lastName: "Wilson", departmentId: 3 },
  { id: 4, firstName: "Emily", lastName: "Davis", departmentId: 1 },
];

const fallbackDepartments: Department[] = [
  { id: 1, name: "Finance", employees: [] },
  { id: 2, name: "HR", employees: [] },
  { id: 3, name: "IT", employees: [] },
];

export function employeeRepo() {
  return {
    async getEmployees(): Promise<Employee[]> {
      try {
        const res = await fetch(`${API}/employees`);
        if (!res.ok) throw new Error("Failed");
        return await res.json();
      } catch {
        return fallbackEmployees;
      }
    },

    async getDepartments(): Promise<Department[]> {
      try {
        const res = await fetch(`${API}/employees/departments`);
        if (!res.ok) throw new Error("Failed");
        return await res.json();
      } catch {
        return fallbackDepartments;
      }
    },

    async createEmployee(input: {
      departmentId: number;
      firstName: string;
      lastName: string;
    }) {
      try {
        const res = await fetch(`${API}/employees`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });

        if (!res.ok) return input;
        return await res.json();
      } catch {
        return input;
      }
    },
  };
}