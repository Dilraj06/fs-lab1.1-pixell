import type { Department } from "../models/department";

export const initialDepartments: Department[] = [
    {
        id: 1,
        name: "Engineering",
        employees: [
            { id: 1, firstName: "John", lastName: "Doe", departmentId: 1 },
            { id: 2, firstName: "Jane", lastName: "Smith", departmentId: 1 },
        ],
    },
    {
        id: 2,
        name: "Human Resources",
        employees: [
            { id: 3, firstName: "Mary", lastName: "Brown", departmentId: 2 },
        ],
    },
    {
        id: 3,
        name: "Finance",
        employees: [
            { id: 4, firstName: "David", lastName: "Wilson", departmentId: 3 },
        ],
    },
];

export let departments: Department[] = structuredClone(initialDepartments);

export function resetDepartments() {
    departments = structuredClone(initialDepartments);
}