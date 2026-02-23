import { useOutletContext } from "react-router-dom";
import type { AppCtx } from "../components/Layout/Layout";
import OrganizationList from "../components/OrganizationList/OrganizationList";
import { roles } from "../data/roles";

export default function OrganizationPage() {
    const { departments } = useOutletContext<AppCtx>();

    // keep the department name with each employee
    const people = departments.flatMap((d) =>
        d.employees.map((e) => ({
            ...e,
            deptName: d.name,
        }))
    );

    const orgPeople = people.map((p) => {
        const match = roles.find((r) => r.employeeId === p.id);

        return {
            id: p.id,
            firstName: p.firstName,
            lastName: p.lastName,
            role: match ? match.title : p.deptName, // ✅ fallback to department
        };
    });

    return (
        <>
            <h2>Organization</h2>
            <p>Leadership &amp; Management</p>

            <OrganizationList roles={orgPeople} />
        </>
    );
}