import { useState } from "react";
import type { CreateOrgInput } from "../repositories/organizationRepository";
import type { ValidationErrors } from "../services/organizationService";

export function useRoleCreateForm(onCreate: (input: CreateOrgInput) => any) {
    const [form, setForm] = useState<CreateOrgInput>({
        firstName: "",
        lastName: "",
        role: "",
    });

    const [errors, setErrors] = useState<ValidationErrors>({});
    const [success, setSuccess] = useState("");

    function update<K extends keyof CreateOrgInput>(key: K, value: string) {
        setForm((p) => ({ ...p, [key]: value }));
        setErrors((p) => ({ ...p, [key]: undefined }));
        setSuccess("");
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();
        setSuccess("");

        const res = onCreate(form);

        if (res?.ok === false) {
            setErrors(res.errors || {});
            return;
        }

        setErrors({});
        setForm({ firstName: "", lastName: "", role: "" });
        setSuccess("Added!");
    }

    return { form, errors, success, update, submit };
}