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