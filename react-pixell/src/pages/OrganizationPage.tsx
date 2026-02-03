import { useOutletContext } from "react-router-dom";
import type { AppCtx } from "../components/Layout/Layout";
import OrganizationList from "../components/OrganizationList/OrganizationList";
import { roles } from "../data/roles";

export default function OrganizationPage() {
    const { departments } = useOutletContext<AppCtx>();

    const employees = departments.flatMap((d) => d.employees);

    const orgPeople = employees.map((e) => {
        const match = roles.find((r) => r.employeeId === e.id);

        return {
            id: e.id,
            firstName: e.firstName,
            lastName: e.lastName,
            role: match ? match.title : "Employee",
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
