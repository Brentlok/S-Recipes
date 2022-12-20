export const printDate = (data: string) => {
    const date = new Date(data);

    if (isNaN(date.valueOf())) {
        return '';
    }

    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}