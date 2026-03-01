import { useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import type { AppCtx } from "../components/Layout/Layout";
import OrganizationList from "../components/OrganizationList/OrganizationList";
import { roles } from "../data/roles";

import RoleCreateForm from "../components/RoleCreateForm/RoleCreateForm";
import { useOrganization } from "../hooks/useOrganization";
import type { OrganizationRecord } from "../repositories/organizationRepository";
import { InMemoryOrganizationRepository } from "../repositories/organizationRepository";

import "./organizationPage.css";

export default function OrganizationPage() {
    const { departments } = useOutletContext<AppCtx>();

    const people = useMemo(() => {
        return departments.flatMap((d) =>
            d.employees.map((e) => ({
                ...e,
                deptName: d.name,
            }))
        );
    }, [departments]);

    const initialOrgPeople: OrganizationRecord[] = useMemo(() => {
        return people.map((p) => {
            const match = roles.find((r) => r.employeeId === p.id);
            return {
                id: p.id,
                firstName: p.firstName,
                lastName: p.lastName,
                role: match ? match.title : p.deptName,
            };
        });
    }, [people]);

    const nextId = useMemo(() => {
        const maxId = initialOrgPeople.reduce((m, r) => Math.max(m, r.id), 0);
        return maxId + 1;
    }, [initialOrgPeople]);

    const repo = useMemo(() => {
        return new InMemoryOrganizationRepository(initialOrgPeople, nextId);
    }, [initialOrgPeople, nextId]);

    const { records, create } = useOrganization(repo);

    const uniqueRoles = useMemo(() => {
        const set = new Set(records.map((r) => r.role.trim().toLowerCase()));
        return set.size;
    }, [records]);

    return (
        <div className="org-page">
            <header className="org-header">
                <h2 className="org-title">Organization</h2>
                <p className="org-subtitle">Leadership &amp; Management</p>
            </header>

            <div className="org-grid">
                <RoleCreateForm onCreate={create} />
                <div className="org-list-wrap">
                    <div className="card">
                        <h3 className="card-title">Overview</h3>

                        <OrganizationList roles={records} />
                    </div>
                </div>
            </div>
        </div>
    );
}