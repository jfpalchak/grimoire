import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Remove the '/api' portion of a given url string.
export function shortUrl(url: string): string {
  return url.slice(4);
}

// Format an array of markdown text to properly render on the DOM.
export function formatMD(text: string[]): string {
  return text.reduce((article, row, i) => {
      if (row.startsWith('|') && text[i + 1]?.startsWith('|')) {
        return article + row + '\n';
      } else {
        return article + highlight(row) + '\n\n';
      }
    }, '');
}

// If the given string includes details of a saving throw,
// return the string with emphasis (in markdown).
function highlight(row: string): string {
  const regex = /(make.*saving|must.*saving)/;
  const hasSavingThrow = regex.test(row);
  const isNotFormatted = !(row.startsWith('-') || row.startsWith('*'));
  if (hasSavingThrow && isNotFormatted) {
    return '_' + row + '_';
  }
  return row;
}

// Calculate the modifier of a given ability score;
// Possible modifiers range from -5 to +10.
export function modifier(score: number): number {
  if (score <= 1) {
    return -5;
  } else if (score >= 30) {
    return 10;
  } else {
    return Math.floor((score - 10) / 2);
  }
}
