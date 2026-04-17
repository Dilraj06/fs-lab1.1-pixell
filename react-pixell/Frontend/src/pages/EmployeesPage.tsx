import { SignedIn, SignedOut, SignInButton, useAuth } from "@clerk/clerk-react";
import { useEffect, useMemo, useState } from "react";
import type { Department, Employee } from "../repositories/employeeRepo";
import { employeeService } from "../services/employeeService";

export default function EmployeesPage() {
    const service = useMemo(() => employeeService(), []);
    const { getToken } = useAuth();

    const [departments, setDepartments] = useState<Department[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [departmentId, setDepartmentId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [formError, setFormError] = useState("");

    async function loadData() {
        try {
            setError("");
            setLoading(true);

            const [departmentsData, employeesData] = await Promise.all([
                service.getDepartments(),
                service.getEmployees(),
            ]);

            setDepartments(Array.isArray(departmentsData) ? departmentsData : []);
            setEmployees(Array.isArray(employeesData) ? employeesData : []);
        } catch {
            setError("Failed to load employee data.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setFormError("");

        if (!departmentId) {
            setFormError("Please select a department.");
            return;
        }

        if (!firstName.trim()) {
            setFormError("First name is required.");
            return;
        }

        if (!lastName.trim()) {
            setFormError("Last name is required.");
            return;
        }

        const token = await getToken();

        const result = await service.createEmployee(
            {
                departmentId: Number(departmentId),
                firstName: firstName.trim(),
                lastName: lastName.trim(),
            },
            token
        );

        if (result?.ok === false) {
            if (result.errors?.departmentId?.length) {
                setFormError(result.errors.departmentId[0]);
                return;
            }
            if (result.errors?.firstName?.length) {
                setFormError(result.errors.firstName[0]);
                return;
            }
            if (result.errors?.lastName?.length) {
                setFormError(result.errors.lastName[0]);
                return;
            }
        }

        if (result?.message) {
            setFormError(result.message);
            return;
        }

        setDepartmentId("");
        setFirstName("");
        setLastName("");
        await loadData();
    }

    function getDepartmentName(id: number) {
        const dept = departments.find((d) => d.id === id);
        return dept ? dept.name : "Unknown";
    }

    if (loading) return <p>Loading employees...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={{ padding: "1rem" }}>
            <h2>Employees</h2>

            <SignedIn>
                <form onSubmit={handleSubmit} style={{ marginBottom: "1.5rem" }}>
                    <div style={{ marginBottom: "0.75rem" }}>
                        <label>Department </label>
                        <select
                            value={departmentId}
                            onChange={(e) => setDepartmentId(e.target.value)}
                        >
                            <option value="">Select department</option>
                            {departments.map((dept) => (
                                <option key={dept.id} value={dept.id}>
                                    {dept.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div style={{ marginBottom: "0.75rem" }}>
                        <label>First Name </label>
                        <input
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>

                    <div style={{ marginBottom: "0.75rem" }}>
                        <label>Last Name </label>
                        <input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <button type="submit">Add Employee</button>

                    {formError && (
                        <p style={{ color: "crimson", marginTop: "0.75rem" }}>
                            {formError}
                        </p>
                    )}
                </form>
            </SignedIn>

            <SignedOut>
                <div
                    style={{
                        padding: "1rem",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        marginBottom: "1.5rem",
                        background: "#f8f8f8",
                        color: "#111",
                    }}
                >
                    <p style={{ marginBottom: "0.75rem" }}>
                        Please sign in to create new employee entries.
                    </p>
                    <SignInButton mode="modal">
                        <button type="button">Sign In</button>
                    </SignInButton>
                </div>
            </SignedOut>

            <h3>Employee List</h3>
            <ul>
                {employees.map((employee) => (
                    <li key={employee.id}>
                        {employee.firstName} {employee.lastName} —{" "}
                        {getDepartmentName(employee.departmentId)}
                    </li>
                ))}
            </ul>
        </div>
    );
}