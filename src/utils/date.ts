export function formateDate(date: Date): string {
    return date.toLocaleDateString();
}

export function getDateFromString(date: string): Date {
    return new Date(date);
}