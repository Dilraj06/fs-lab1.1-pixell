import { useRoleCreateForm } from "../../hooks/useRoleCreateForm";
import type { CreateOrgInput } from "../../repositories/organizationRepository";

export default function RoleCreateForm({
    onCreate,
}: {
    onCreate: (input: CreateOrgInput) => any;
}) {
    const { form, errors, success, update, submit } = useRoleCreateForm(onCreate);

    return (
        <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <div>
                    <h3 className="card-title">Role Creation</h3>
                    <p className="card-help">
                        Add a person + role. Roles must be unique (one person per role).
                    </p>
                </div>
                <span className="pill">Lab 3.2</span>
            </div>

            <form onSubmit={submit} className="stack">
                <div>
                    <label className="label">First Name</label>
                    <input
                        className="input"
                        value={form.firstName}
                        onChange={(e) => update("firstName", e.target.value)}
                        placeholder="Min 3 characters"
                    />
                    {errors.firstName && <div className="error">{errors.firstName}</div>}
                </div>

                <div>
                    <label className="label">Last Name</label>
                    <input
                        className="input"
                        value={form.lastName}
                        onChange={(e) => update("lastName", e.target.value)}
                        placeholder="Required"
                    />
                    {errors.lastName && <div className="error">{errors.lastName}</div>}
                </div>

                <div>
                    <label className="label">Role</label>
                    <input
                        className="input"
                        value={form.role}
                        onChange={(e) => update("role", e.target.value)}
                        placeholder="e.g., HR Lead"
                    />
                    {errors.role && <div className="error">{errors.role}</div>}
                </div>

                <div className="actions">
                    <button className="btn btn-primary" type="submit">
                        Create
                    </button>
                </div>

                {success && <div className="success">{success}</div>}
            </form>
        </div>
    );
}