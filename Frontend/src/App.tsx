import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout, { type AppCtx } from "./components/Layout/Layout";
import EmployeesPage from "./pages/EmployeesPage";
import OrganizationPage from "./pages/OrganizationPage";
import { employeeService } from "./services/employeeService";

export default function App() {
  const svc = useMemo(() => employeeService(), []);
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  const { data: departments = [] } = useQuery({
    queryKey: ["departments"],
    queryFn: () => svc.getDepartments(),
  });

  const addEmployeeMutation = useMutation({
    mutationFn: async (data: {
      firstName: string;
      lastName: string;
      department: string;
    }) => {
      const dept = departments.find((d) => d.name === data.department);
      const token = await getToken();

      return svc.createEmployee(
        {
          departmentId: dept ? dept.id : -1,
          firstName: data.firstName,
          lastName: data.lastName,
        },
        token
      );
    },
    onSuccess: async (result) => {
      if (result.ok) {
        await queryClient.invalidateQueries({ queryKey: ["departments"] });
      }
    },
  });

  async function handleAddEmployee(data: {
    firstName: string;
    lastName: string;
    department: string;
  }) {
    const result = await addEmployeeMutation.mutateAsync(data);

    if (!result.ok) {
      return {
        ok: false,
        errors: {
          firstName: result.errors?.firstName ?? [],
          department:
            result.errors?.departmentId ?? ["Please select an existing department."],
        },
      };
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