import { organizationRepository } from "../repositories/organizationRepository";

export function organizationService() {
    const repo = organizationRepository();

    return {
        async getOrganization() {
            return repo.getOrganization();
        },

        async getRoles() {
            return repo.getRoles();
        },

        async createRole(input: { employeeId: number; role: string }) {
            return repo.createRole(input);
        },
    };
}