import { useCallback, useState } from "react";
import type {
    CreateOrgInput,
    OrganizationRecord,
    OrganizationRepository,
} from "../repositories/organizationRepository";
import { validateCreateOrg } from "../services/organizationService";

export function useOrganization(repo: OrganizationRepository) {
    const [records, setRecords] = useState<OrganizationRecord[]>(() => repo.getAll());

    const refresh = useCallback(() => {
        setRecords(repo.getAll());
    }, [repo]);

    const create = useCallback(
        (input: CreateOrgInput) => {
            const validation = validateCreateOrg(input, repo.getAll());
            if (!validation.ok) return validation;

            const rec = repo.add(validation.value);
            setRecords(repo.getAll());
            return { ok: true, value: rec as OrganizationRecord };
        },
        [repo]
    );

    const remove = useCallback(
        (id: number) => {
            repo.remove(id);
            setRecords(repo.getAll());
        },
        [repo]
    );

    return { records, create, remove, refresh };
}