import { useEffect, useMemo, useState } from "react";
import type { Employee } from "../repositories/employeeRepo";
import type { OrganizationRecord } from "../repositories/organizationRepository";
import { employeeService } from "../services/employeeService";
import { organizationService } from "../services/organizationService";

import "./organizationPage.css";

export default function OrganizationPage() {
    const orgService = useMemo(() => organizationService(), []);
    const empService = useMemo(() => employeeService(), []);

    const [records, setRecords] = useState<OrganizationRecord[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [employeeId, setEmployeeId] = useState("");
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

            setRecords(organizationData);
            setEmployees(employeesData);
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

        const result = await orgService.createRole({
            employeeId: Number(employeeId),
            role,
        });

        if (result?.message) {
            setFormError(result.message);
            return;
        }

        setEmployeeId("");
        setRole("");
        await loadData();
    }

    const uniqueRoles = useMemo(() => {
        const set = new Set(records.map((r) => r.role.trim().toLowerCase()));
        return set.size;
    }, [records]);

    function getEmployeeName(id: number) {
        const employee = employees.find((e) => e.id === id);
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

            <form onSubmit={handleSubmit} style={{ marginBottom: "1.5rem" }}>
                <div style={{ marginBottom: "0.75rem" }}>
                    <label>Employee </label>
                    <select
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                    >
                        <option value="">Select employee</option>
                        {employees.map((employee) => (
                            <option key={employee.id} value={employee.id}>
                                {employee.firstName} {employee.lastName}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: "0.75rem" }}>
                    <label>Role </label>
                    <input
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    />
                </div>

                <button type="submit">Add / Update Role</button>

                {formError && (
                    <p style={{ color: "crimson", marginTop: "0.75rem" }}>
                        {formError}
                    </p>
                )}
            </form>

            <h3>Overview</h3>
            <ul>
                {records.map((record) => (
                    <li key={record.id}>
                        {record.firstName} {record.lastName} — {record.role}
                    </li>
                ))}
            </ul>

            <h3 style={{ marginTop: "1.5rem" }}>Current Role Assignments</h3>
            <ul>
                {records.map((record) => (
                    <li key={`role-${record.id}`}>
                        {getEmployeeName(record.id)} — {record.role}
                    </li>
                ))}
            </ul>
        </div>
    );
}