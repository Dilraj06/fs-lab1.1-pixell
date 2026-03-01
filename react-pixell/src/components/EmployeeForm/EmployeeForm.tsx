import { useEffect } from "react";
import { useFormInput } from "../../hooks/useFormInput";

type Props = {
  departmentNames: string[];
  onAddEmployee: (data: {
    firstName: string;
    lastName: string;
    department: string;
  }) => { ok: boolean; errors: { firstName?: string[]; department?: string[] } };
};

export default function EmployeeForm({ departmentNames, onAddEmployee }: Props) {
  const firstName = useFormInput<string>("");
  const lastName = useFormInput<string>("");
  const department = useFormInput<string>(departmentNames[0] ?? "");

  // keep dropdown valid if departments change
  useEffect(() => {
    if (!departmentNames.includes(department.value)) {
      department.setValue(departmentNames[0] ?? "");
      department.setMessages([]);
    }
  }, [departmentNames, department]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // clear old messages
    firstName.setMessages([]);
    department.setMessages([]);

    // call Layout handler (which calls service)
    const result = onAddEmployee({
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      department: department.value,
    });

    if (!result.ok) {
      firstName.setMessages(result.errors.firstName ?? []);
      department.setMessages(result.errors.department ?? []);
      return;
    }

    // success reset
    firstName.setValue("");
    lastName.setValue("");
    department.setValue(departmentNames[0] ?? "");
  }

  const allErrors = [...firstName.messages, ...department.messages];

  return (
    <section className="employee-form">
      <h2>Add New Employee</h2>

      {allErrors.length > 0 && (
        <section aria-live="polite">
          <ul>
            {allErrors.map((msg, i) => (
              <li key={`${msg}-${i}`}>{msg}</li>
            ))}
          </ul>
        </section>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" value={firstName.value} onChange={firstName.onChange} />
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" value={lastName.value} onChange={lastName.onChange} />
        </div>

        <div>
          <label htmlFor="department">Department</label>
          <select id="department" value={department.value} onChange={department.onChange}>
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