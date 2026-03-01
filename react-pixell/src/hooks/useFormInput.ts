import { useState } from "react";

type Validator<T> = (value: T) => string[];

export function useFormInput<T>(initialValue: T) {
    const [value, setValue] = useState<T>(initialValue);
    const [messages, setMessages] = useState<string[]>([]);

    function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setValue(e.target.value as unknown as T);
    }

    function validate(validator: Validator<T>) {
        const errs = validator(value) || [];
        setMessages(errs);
        return errs.length === 0;
    }

    return { value, setValue, onChange, messages, setMessages, validate };
}