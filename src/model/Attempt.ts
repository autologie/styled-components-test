import { Color } from "./Color";
import { Effect } from "./Effect";

export type Attempt =
  | {
      isEditing: false;
      word: string;
      colors: Color[];
      effect?: Effect;
    }
  | {
      isEditing: true;
      word: string;
      effect?: Effect;
    };

export function isSolved(attempt: Attempt): boolean {
  return !attempt.isEditing && attempt.colors.every((c) => c === "g");
}

export function colorAt(
  attempt: Attempt | undefined,
  column: number
): Color | undefined {
  return attempt === undefined || attempt.isEditing
    ? undefined
    : attempt.colors[column];
}

export function finishEditing(attempt: Attempt, answer: string): Attempt {
  return {
    ...attempt,
    isEditing: false,
    colors: attempt.word
      .split("")
      .map((ch, i) =>
        ch === answer[i] ? "g" : answer.includes(ch) ? "y" : "b"
      ),
    effect: "accepted",
  };
}
