import type { CreateOrgInput, OrganizationRecord } from "../repositories/organizationRepository";

export type ValidationErrors = Partial<Record<keyof CreateOrgInput, string>>;

export type ServiceResult<T> =
    | { ok: true; value: T }
    | { ok: false; errors: ValidationErrors };

const norm = (s: string) => s.trim();
const key = (s: string) => norm(s).toLowerCase();

export function validateCreateOrg(
    input: CreateOrgInput,
    existing: OrganizationRecord[]
): ServiceResult<CreateOrgInput> {
    const firstName = norm(input.firstName);
    const lastName = norm(input.lastName);
    const role = norm(input.role);

    const errors: ValidationErrors = {};

    if (firstName.length < 3) errors.firstName = "First name must be at least 3 characters.";
    if (lastName.length === 0) errors.lastName = "Last name is required.";
    if (role.length === 0) errors.role = "Role is required.";

    // cannot create if the role already exists and is occupied
    const occupied = existing.some((r) => key(r.role) === key(role));
    if (role && occupied) errors.role = "This role already exists and is occupied.";

    if (Object.keys(errors).length > 0) return { ok: false, errors };

    return { ok: true, value: { firstName, lastName, role } };
}