import { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout, { type AppCtx } from "./components/Layout/Layout";
import type { Department } from "./data/departments";
import EmployeesPage from "./pages/EmployeesPage";
import OrganizationPage from "./pages/OrganizationPage";
import { employeeService } from "./services/employeeService";

export default function App() {
  const svc = useMemo(() => employeeService(), []);
  const [departments, setDepartments] = useState<Department[]>([]);

  // presentation-only state: load from repo via service
  useEffect(() => {
    setDepartments(svc.getDepartments());
  }, [svc]);

  function handleAddEmployee(data: { firstName: string; lastName: string; department: string }) {
    // convert department NAME -> department ID
    const dept = svc.getDepartments().find((d) => d.name === data.department);

    const result = svc.createEmployee({
      departmentId: dept ? dept.id : -1,
      firstName: data.firstName,
      lastName: data.lastName,
    });

    if (!result.ok) {
      return {
        ok: false,
        errors: {
          firstName: result.errors.firstName ?? [],
          department: result.errors.departmentId ?? ["Please select an existing department."],
        },
      };
    }

    // refresh UI from repo after success
    setDepartments(svc.getDepartments());
    return { ok: true, errors: {} };
  }

  const ctx: AppCtx = useMemo(
    () => ({
      departments,
      onAddEmployee: handleAddEmployee,
    }),
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