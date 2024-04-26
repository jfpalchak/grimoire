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
// and is not a list or bolded item,
// return the string with emphasis (in markdown),
// otherwise return the string without emphasis.
function highlight(row: string): string {
  const hasSavingThrow = row.match('make.*saving throw|must.*saving throw.*$');
  const isNotFormatted = !(row.startsWith('-') || row.startsWith('*'));
  if (hasSavingThrow && isNotFormatted) {
    return row = '_' + row + '_';
  }
  return row;
}
