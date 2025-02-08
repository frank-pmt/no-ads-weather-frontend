
export function formatAsIsoDate(date: Date): string {
    return date.toISOString().substring(0, 10);
}

export function formatHoursOf(date: Date): string {
    return date.toLocaleTimeString('en-US', { hour: 'numeric' });
}

export function formatLocaleDate(date: Date, locale: string): string {
    return date.toLocaleDateString(locale ? locale : 'en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
    })
}

export function formatLocaleDateShort(date: Date, locale: string): string {
    return date.toLocaleDateString(locale ? locale : 'en-US', {
        month: 'short',
        day: 'numeric'
    })
}

export function formatLocaleDayOfWeek(date: Date, locale: string): string {
    return date.toLocaleDateString(locale ? locale : 'en-US', {
        weekday: 'long'
    })
}