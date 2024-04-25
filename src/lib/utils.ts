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
        return article + highlight(row) + '\n\n';
      }
    }, '');
}

// If the given string includes details of a saving throw,
// and is not a list item,
// return the string with emphasis (in markdown),
// otherwise return the string without emphasis.
function highlight(row: string): string {
  if (row.includes('saving throw') && !row.startsWith('-')) {
    return row = '_' + row + '_';
  }
  return row;
}
