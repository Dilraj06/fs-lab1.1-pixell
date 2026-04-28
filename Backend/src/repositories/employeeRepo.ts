import { departments } from "../data/departments";

export function employeeRepo() {
    return {
        getDepartments() {
            return departments;
        },

        getDepartmentById(departmentId: number) {
            return departments.find((department) => department.id === departmentId);
        },

        getEmployees() {
            return departments.flatMap((department) => department.employees);
        },

        createEmployee(
            departmentId: number,
            input: {
                firstName: string;
                lastName: string;
            }
        ) {
            const allEmployees = departments.flatMap((department) => department.employees);

            const newId =
                allEmployees.length > 0
                    ? Math.max(...allEmployees.map((employee) => employee.id)) + 1
                    : 1;

            const newEmployee = {
                id: newId,
                firstName: input.firstName,
                lastName: input.lastName,
                departmentId,
            };

            const department = departments.find((dept) => dept.id === departmentId);

            if (!department) {
                throw new Error("Department not found");
            }

            department.employees.push(newEmployee);

            return newEmployee;
        },
    };
}