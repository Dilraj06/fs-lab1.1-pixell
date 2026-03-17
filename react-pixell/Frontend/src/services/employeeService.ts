import { employeeRepo } from "../repositories/employeeRepo";

export function employeeService() {
    const repo = employeeRepo();

    return {
        async getEmployees() {
            return repo.getEmployees();
        },

        async getDepartments() {
            return repo.getDepartments();
        },

        async createEmployee(input: {
            departmentId: number;
            firstName: string;
            lastName: string;
        }) {
            return repo.createEmployee(input);
        },
    };
}