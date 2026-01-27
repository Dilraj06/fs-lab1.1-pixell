import { useState } from "react";
import DepartmentList from "./components/DepartmentList/DepartmentList";
import EmployeeForm from "./components/EmployeeForm/EmployeeForm";

type Employee = {
  id: number;
  firstName: string;
  lastName: string;
};

type Department = {
  id: number;
  name: string;
  employees: Employee[];
};

const initialDepartments: Department[] = [
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

export default function App() {
  // IMPORTANT for Lab 2.1: list must be rendered from state so it updates live
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);

  const departmentNames = departments.map((d) => d.name);

  function handleAddEmployee(data: { firstName: string; lastName: string; department: string }) {
    setDepartments((prev) => {
      // find selected department
      const deptIndex = prev.findIndex((d) => d.name === data.department);
      if (deptIndex === -1) return prev;

      // new employee id
      const maxId = prev.flatMap((d) => d.employees).reduce((m, e) => Math.max(m, e.id), 0);
      const newEmployee: Employee = {
        id: maxId + 1,
        firstName: data.firstName,
        lastName: data.lastName,
      };

      // immutably update the correct department
      return prev.map((d, i) =>
        i === deptIndex ? { ...d, employees: [...d.employees, newEmployee] } : d
      );
    });
  }

  return (
    <main>
      <h1>PiXELL River Financial — Employees</h1>

      <DepartmentList departments={departments} />

      {/* Form must be at the bottom */}
      <EmployeeForm departmentNames={departmentNames} onAddEmployee={handleAddEmployee} />
    </main>
  );
}
