export type OrganizationRecord = {
    id: number;
    firstName: string;
    lastName: string;
    role: string;
};

export type CreateOrgInput = {
    firstName: string;
    lastName: string;
    role: string;
};

export interface OrganizationRepository {
    getAll(): OrganizationRecord[];
    add(input: CreateOrgInput): OrganizationRecord;
    remove(id: number): void;
}

export class InMemoryOrganizationRepository implements OrganizationRepository {
    private records: OrganizationRecord[];
    private nextId: number;

    constructor(seed: OrganizationRecord[] = [], startId?: number) {
        this.records = [...seed];
        const maxSeed = seed.reduce((m, r) => Math.max(m, r.id), 0);
        this.nextId = typeof startId === "number" ? startId : maxSeed + 1;
    }

    getAll() {
        return [...this.records];
    }

    add(input: CreateOrgInput) {
        const rec: OrganizationRecord = {
            id: this.nextId++,
            firstName: input.firstName.trim(),
            lastName: input.lastName.trim(),
            role: input.role.trim(),
        };
        this.records = [rec, ...this.records];
        return rec;
    }

    remove(id: number) {
        this.records = this.records.filter((r) => r.id !== id);
    }
}