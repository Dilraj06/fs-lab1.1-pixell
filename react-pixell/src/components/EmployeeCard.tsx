import type { Employee } from "../types/Employee";

export default function EmployeeCard({ employee }: { employee: Employee }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
      <h3>{employee.name}</h3>
      <p>{employee.role}</p>
      <p>{employee.department}</p>
      <a href={`mailto:${employee.email}`}>{employee.email}</a>
    </div>
  );
}
