export const printDate = (data: string) => {
    const date = new Date(data);

    if (isNaN(date.valueOf())) {
        return '';
    }

    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

export const validateNonEmpty = <T extends Record<string, string>>(data: T) => {
    const errors: string[] = [];

    for (const key in data) {
        if (data[key] === '') {
            errors.push(key);
        }
    }

    return errors;
}

export const objToFormData = (obj: Record<string, unknown>) => {
    const formData = new FormData();

    for (const key in obj) {
        const itemRaw = obj[key];
        const item = itemRaw instanceof Blob ? itemRaw : String(itemRaw);
        formData.append(key, item);
    }

    return formData;
}