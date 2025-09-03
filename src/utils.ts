export function percentOfTotal(value: number | undefined, total: number): number {
    if (!value || total === 0) return 0;
    return (value / total) * 100;
}
