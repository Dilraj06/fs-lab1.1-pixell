import { SignedIn, SignedOut, SignInButton, useAuth } from "@clerk/clerk-react";
import { useEffect, useMemo, useState } from "react";
import type { Employee } from "../repositories/employeeRepo";
import { employeeService } from "../services/employeeService";
import { organizationService } from "../services/organizationService";

import "./organizationPage.css";

type OrganizationEmployee = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    roleId: string;
    roleTitle: string;
    departmentId: string;
    deptName: string;
};

type OrganizationDepartment = {
    id: string;
    name: string;
    employees: OrganizationEmployee[];
};

export default function OrganizationPage() {
    const orgService = useMemo(() => organizationService(), []);
    const empService = useMemo(() => employeeService(), []);
    const { getToken } = useAuth();

    const [records, setRecords] = useState<OrganizationDepartment[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [role, setRole] = useState("");
    const [formError, setFormError] = useState("");

    async function loadData() {
        try {
            setError("");
            setLoading(true);

            const [organizationData, employeesData] = await Promise.all([
                orgService.getOrganization(),
                empService.getEmployees(),
            ]);

            setRecords(Array.isArray(organizationData) ? organizationData : []);
            setEmployees(Array.isArray(employeesData) ? employeesData : []);
        } catch {
            setError("Failed to load organization data.");
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

        if (!role.trim()) {
            setFormError("Role is required.");
            return;
        }

        const token = await getToken();

        const result = await orgService.createRole(
            { title: role.trim() },
            token
        );

        if (result?.message) {
            setFormError(result.message);
            return;
        }

        setRole("");
        await loadData();
    }

    const allEmployees = useMemo(() => {
        return records.flatMap((department) => department.employees);
    }, [records]);

    const uniqueRoles = useMemo(() => {
        const set = new Set(
            allEmployees
                .map((employee) => employee.roleTitle?.trim().toLowerCase())
                .filter(Boolean)
        );
        return set.size;
    }, [allEmployees]);

    function getEmployeeName(id: number | string) {
        const employee = employees.find((e) => String(e.id) === String(id));
        return employee ? `${employee.firstName} ${employee.lastName}` : `Employee ${id}`;
    }

    if (loading) return <p>Loading organization...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="org-page" style={{ padding: "1rem" }}>
            <header className="org-header">
                <h2 className="org-title">Organization</h2>
                <p className="org-subtitle">Leadership &amp; Management</p>
                <p>Unique Roles: {uniqueRoles}</p>
            </header>

            <SignedIn>
                <form onSubmit={handleSubmit} style={{ marginBottom: "1.5rem" }}>
                    <div style={{ marginBottom: "0.75rem" }}>
                        <label>Role </label>
                        <input
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        />
                    </div>

                    <button type="submit">Add Role</button>

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
                        Please sign in to create new organization entries.
                    </p>
                    <SignInButton mode="modal">
                        <button type="button">Sign In</button>
                    </SignInButton>
                </div>
            </SignedOut>

            <h3>Overview</h3>
            {records.map((department) => (
                <div key={department.id} style={{ marginBottom: "1rem" }}>
                    <h4>{department.name}</h4>
                    <ul>
                        {department.employees.map((employee) => (
                            <li key={employee.id}>
                                {employee.firstName} {employee.lastName} — {employee.roleTitle}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

            <h3 style={{ marginTop: "1.5rem" }}>Current Role Assignments</h3>
            <ul>
                {allEmployees.map((employee) => (
                    <li key={`role-${employee.id}`}>
                        {getEmployeeName(employee.id)} — {employee.roleTitle}
                    </li>
                ))}
            </ul>
        </div>
    );
}