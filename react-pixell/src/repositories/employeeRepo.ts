import type { Department, Employee } from "../data/departments";
import { initialDepartments } from "../data/departments";

let departmentsStore: Department[] = structuredClone(initialDepartments);
// (temporary in-memory store like earlier labs)

function nextEmployeeId() {
    // find max existing id, then +1
    let max = 0;
    for (const d of departmentsStore) {
        for (const e of d.employees) {
            if (e.id > max) max = e.id;
        }
    }
    return max + 1;
}

export function employeeRepo() {
    return {
        getDepartments(): Department[] {
            return departmentsStore;
        },

        getDepartmentById(departmentId: number): Department | undefined {
            return departmentsStore.find((d) => d.id === departmentId);
        },

        createEmployee(departmentId: number, emp: Omit<Employee, "id">): Employee {
            const dept = departmentsStore.find((d) => d.id === departmentId);
            if (!dept) throw new Error("Department not found");

            const created: Employee = { id: nextEmployeeId(), ...emp };
            dept.employees = [...dept.employees, created];

            return created;
        },

        getEmployeesByDepartment(departmentId: number): Employee[] {
            const dept = departmentsStore.find((d) => d.id === departmentId);
            return dept ? dept.employees : [];
        },

        // optional helper if you need reset during dev
        reset(): void {
            departmentsStore = structuredClone(initialDepartments);
        },
    };
}