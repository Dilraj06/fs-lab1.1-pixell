import { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout, { type AppCtx } from "./components/Layout/Layout";
import EmployeesPage from "./pages/EmployeesPage";
import OrganizationPage from "./pages/OrganizationPage";
import type { Department } from "./repositories/employeeRepo";
import { employeeService } from "./services/employeeService";

export default function App() {
  const svc = useMemo(() => employeeService(), []);
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const data = await svc.getDepartments();
        setDepartments(data);
      } catch (error) {
        console.error("Failed to load departments:", error);
      }
    };

    loadDepartments();
  }, [svc]);

  async function handleAddEmployee(data: {
    firstName: string;
    lastName: string;
    department: string;
  }) {
    const dept = departments.find((d) => d.name === data.department);

    const result = await svc.createEmployee({
      departmentId: dept ? dept.id : -1,
      firstName: data.firstName,
      lastName: data.lastName,
    });

    if (!result.ok) {
      return {
        ok: false,
        errors: {
          firstName: result.errors?.firstName ?? [],
          department:
            result.errors?.departmentId ?? [
              "Please select an existing department.",
            ],
        },
      };
    }

    try {
      const updatedDepartments = await svc.getDepartments();
      setDepartments(updatedDepartments);
    } catch (error) {
      console.error("Failed to refresh departments:", error);
    }

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