import "./organizationList.css";

type OrgPerson = {
    id: number;
    firstName: string;
    lastName: string;
    role: string;
};

type Props = {
    roles: OrgPerson[];
};

export default function OrganizationList({ roles }: Props) {
    return (
        <div className="org-table">
            <div className="org-row org-row--head">
                <div className="org-col org-col--name">Name</div>
                <div className="org-col org-col--role">Role</div>
            </div>

            {roles.map((p) => (
                <div className="org-row" key={p.id}>
                    <div className="org-col org-col--name">
                        {p.firstName} {p.lastName}
                    </div>
                    <div className="org-col org-col--role">{p.role}</div>
                </div>
            ))}
        </div>
    );
}
