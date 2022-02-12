import { Color } from "./Color";

export type Attempt =
  | { isEditing: false; word: string; colors: Color[] }
  | { isEditing: true; word: string };

export function isSolved(attempt: Attempt): boolean {
  return !attempt.isEditing && attempt.colors.every((c) => c === "g");
}
