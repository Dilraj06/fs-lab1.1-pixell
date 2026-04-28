import { SignedIn, SignedOut, SignInButton, useAuth } from "@clerk/clerk-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
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

type Role = {
    id: string;
    title: string;
};

export default function OrganizationPage() {
    const orgService = useMemo(() => organizationService(), []);
    const empService = useMemo(() => employeeService(), []);
    const { getToken } = useAuth();
    const queryClient = useQueryClient();

    const [role, setRole] = useState("");
    const [formError, setFormError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const employeesPerPage = 3;

    const {
        data: records = [],
        isLoading: organizationLoading,
        error: organizationError,
    } = useQuery<OrganizationDepartment[]>({
        queryKey: ["organization"],
        queryFn: () => orgService.getOrganization(),
    });

    const {
        data: employees = [],
        isLoading: employeesLoading,
        error: employeesError,
    } = useQuery<Employee[]>({
        queryKey: ["employees"],
        queryFn: () => empService.getEmployees(),
    });

    const {
        data: roles = [],
        isLoading: rolesLoading,
        error: rolesError,
    } = useQuery<Role[]>({
        queryKey: ["roles"],
        queryFn: () => orgService.getRoles(),
    });

    const addRoleMutation = useMutation({
        mutationFn: async () => {
            const token = await getToken();

            return orgService.createRole(
                { title: role.trim() },
                token
            );
        },
        onSuccess: async (result) => {
            if (result?.message) {
                setFormError(result.message);
                return;
            }

            setRole("");
            setFormError("");

            await queryClient.invalidateQueries({ queryKey: ["roles"] });
            await queryClient.invalidateQueries({ queryKey: ["organization"] });
            await queryClient.invalidateQueries({ queryKey: ["employees"] });
        },
    });

    const deleteRoleMutation = useMutation({
        mutationFn: async (id: string) => {
            const token = await getToken();
            return orgService.deleteRole(id, token);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["roles"] });
            await queryClient.invalidateQueries({ queryKey: ["organization"] });
            await queryClient.invalidateQueries({ queryKey: ["employees"] });
        },
    });




    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setFormError("");

        if (!role.trim()) {
            setFormError("Role is required.");
            return;
        }

        await addRoleMutation.mutateAsync();
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
        return employee
            ? `${employee.firstName} ${employee.lastName}`
            : `Employee ${id}`;
    }

    const totalPages = Math.ceil(allEmployees.length / employeesPerPage);
    const startIndex = (currentPage - 1) * employeesPerPage;
    const paginatedEmployees = allEmployees.slice(
        startIndex,
        startIndex + employeesPerPage
    );

    if (organizationLoading || employeesLoading || rolesLoading) {
        return <p>Loading organization...</p>;
    }

    if (organizationError || employeesError || rolesError) {
        return <p>Failed to load organization data.</p>;
    }

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
                            placeholder="Enter role title"
                        />
                    </div>

                    <button type="submit" disabled={addRoleMutation.isPending}>
                        {addRoleMutation.isPending ? "Adding..." : "Add Role"}
                    </button>

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

            <h3>Role List</h3>
            <ul>
                {roles.map((role) => (
                    <li key={role.id}>
                        {role.title}

                        <SignedIn>
                            <button
                                type="button"
                                onClick={() => deleteRoleMutation.mutate(role.id)}
                                disabled={deleteRoleMutation.isPending}
                                style={{ marginLeft: "0.75rem" }}
                            >
                                Remove
                            </button>
                        </SignedIn>
                    </li>
                ))}
            </ul>

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
                {paginatedEmployees.map((employee) => (
                    <li key={`role-${employee.id}`}>
                        {getEmployeeName(employee.id)} — {employee.roleTitle}
                    </li>
                ))}
            </ul>

            <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
                <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((page) => page - 1)}
                >
                    Previous
                </button>

                <span>
                    Page {currentPage} of {totalPages || 1}
                </span>

                <button
                    type="button"
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={() => setCurrentPage((page) => page + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}