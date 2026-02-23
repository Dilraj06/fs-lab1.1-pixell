export type Employee = {
    id: number;
    firstName: string;
    lastName: string;
};

export type Department = {
    id: number;
    name: string;
    employees: Employee[];
};

export const initialDepartments: Department[] = [
    {
        id: 1,
        name: "Customer Service",
        employees: [
            { id: 1, firstName: "Ava", lastName: "Thompson" },
            { id: 2, firstName: "Noah", lastName: "Green" },
        ],
    },
    {
        id: 2,
        name: "Loans",
        employees: [{ id: 3, firstName: "Mia", lastName: "Singh" }],
    },
    {
        id: 3,
        name: "IT Support",
        employees: [],
    },
];
