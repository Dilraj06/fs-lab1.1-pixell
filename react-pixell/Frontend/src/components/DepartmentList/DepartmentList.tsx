


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

type Props = { departments: Department[] };


export default function DepartmentList({ departments }: Props) {
  return (
    <section className="department-list">
      {departments.map((dept) => (
        <section className="department" key={dept.id}>
          <h2>{dept.name}</h2>

          {dept.employees.length === 0 ? (
            <p>No employees yet.</p>
          ) : (
            <ul>
              {dept.employees.map((emp) => (
                <li key={emp.id}>
                  {emp.firstName} {emp.lastName}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </section>
  );
}
