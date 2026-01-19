import EmployeeCard from "../components/EmployeeCard";
import employeesData from "../data/employees.json";
import type { Employee } from "../types/Employee";

export default function HomePage() {
  const employees = employeesData as Employee[];

  return (
    <div style={{ padding: 24 }}>
      <h1>PiXELL River Financial</h1>
      <h2>Employees</h2>

      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        {employees.map((e) => (
          <EmployeeCard key={e.id} employee={e} />
        ))}
      </div>
    </div>
  );
}
