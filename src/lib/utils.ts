import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format an array of markdown text to properly render on the DOM.
export function formatMD(text: string[]): string {
  return text.reduce((article, row, i) => {
      if (row.includes('|') && text[i + 1]?.includes('|')) {
        return article + row + '\n';
      } else {
        return article + row + '\n\n';
      }
    }, '');
}
