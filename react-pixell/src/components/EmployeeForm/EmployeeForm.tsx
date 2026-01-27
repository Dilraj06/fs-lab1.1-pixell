import { useMemo, useState } from "react";

type Props = {
  departmentNames: string[];
  onAddEmployee: (data: { firstName: string; lastName: string; department: string }) => void;
};

export default function EmployeeForm({ departmentNames, onAddEmployee }: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [department, setDepartment] = useState(departmentNames[0] ?? "");
  const [errors, setErrors] = useState<string[]>([]);

  // If departments ever change, keep dropdown valid
  useMemo(() => {
    if (!departmentNames.includes(department)) {
      setDepartment(departmentNames[0] ?? "");
    }
  }, [departmentNames, department]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Clear existing validation messages
    const nextErrors: string[] = [];

    if (firstName.trim().length < 3) {
      nextErrors.push("First name must be at least 3 characters.");
    }

    if (!departmentNames.includes(department)) {
      nextErrors.push("Please select an existing department.");
    }

    setErrors(nextErrors);

    // If failed validations, do NOT add employee
    if (nextErrors.length > 0) return;

    onAddEmployee({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      department,
    });

    // Optional: reset form after success
    setFirstName("");
    setLastName("");
    setDepartment(departmentNames[0] ?? "");
  }

  return (
    <section className="employee-form">
      <h2>Add New Employee</h2>

      {errors.length > 0 && (
        <section aria-live="polite">
          <ul>
            {errors.map((msg) => (
              <li key={msg}>{msg}</li>
            ))}
          </ul>
        </section>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="department">Department</label>
          <select
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            {departmentNames.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Add Employee</button>
      </form>
    </section>
  );
}
