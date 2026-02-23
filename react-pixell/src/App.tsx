import { useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { initialDepartments, type Department, type Employee } from "./data/departments";
import EmployeesPage from "./pages/EmployeesPage";
import OrganizationPage from "./pages/OrganizationPage";

export default function App() {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);

  function handleAddEmployee(data: { firstName: string; lastName: string; department: string }) {
    setDepartments((prev) => {
      const deptIndex = prev.findIndex((d) => d.name === data.department);
      if (deptIndex === -1) return prev;

      const maxId = prev.flatMap((d) => d.employees).reduce((m, e) => Math.max(m, e.id), 0);

      const newEmployee: Employee = {
        id: maxId + 1,
        firstName: data.firstName,
        lastName: data.lastName,
      };

      return prev.map((d, i) =>
        i === deptIndex ? { ...d, employees: [...d.employees, newEmployee] } : d
      );
    });
  }

  const ctx = useMemo(
    () => ({ departments, onAddEmployee: handleAddEmployee }),
    [departments]
  );

  return (
    <Routes>
      <Route path="/" element={<Layout context={ctx} />}>
        <Route index element={<Navigate to="/employees" replace />} />
        <Route path="employees" element={<EmployeesPage />} />
        <Route path="organization" element={<OrganizationPage />} />
        <Route path="*" element={<h2>Page not found</h2>} />
      </Route>
    </Routes>
  );
}
