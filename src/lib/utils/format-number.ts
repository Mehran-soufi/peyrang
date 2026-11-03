export function toPersianNumber(value: number | string): string {
    return new Intl.NumberFormat("fa-IR").format(Number(value));
}