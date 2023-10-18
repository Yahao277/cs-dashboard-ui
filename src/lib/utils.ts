import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalize(handle: string | string[]) {
  if (typeof handle === 'string') {
    return handle.charAt(0).toUpperCase() + handle.slice(1);
  } else {
    return handle.map((h) => h.charAt(0).toUpperCase() + h.slice(1));
  }
}

export function formatAmount(amount: number | null | undefined, currency: string) {
  const _amount = amount || 0;
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency,
  }).format(_amount / 100);
}