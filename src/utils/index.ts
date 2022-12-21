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