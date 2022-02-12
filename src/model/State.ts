import { MAX_ATTEMPTS, VALID_WORDS, WORD_LENGTH } from "../const";
import { isSolved, Attempt } from "./Attempt";

export interface State {
  answer: string;
  attempts: Attempt[];
}

function isPlaying(state: State): boolean {
  return (
    (state.attempts.length < MAX_ATTEMPTS ||
      state.attempts[MAX_ATTEMPTS - 1].isEditing) &&
    state.attempts.every((attempt) => !isSolved(attempt))
  );
}

export type Action =
  | { type: "confirm" }
  | { type: "char"; payload: string }
  | { type: "del" };

export function getInitialState(answer: string): State {
  return {
    answer,
    attempts: [{ isEditing: true, word: "" }],
  };
}

export function applyAction(state: State, action: Action): State {
  if (!isPlaying(state)) {
    return state;
  }

  switch (action.type) {
    case "char": {
      return {
        ...state,
        attempts: state.attempts.map((attempt) =>
          attempt.isEditing && attempt.word.length < WORD_LENGTH
            ? { ...attempt, word: `${attempt.word}${action.payload}` }
            : attempt
        ),
      };
    }
    case "del": {
      return {
        ...state,
        attempts: state.attempts.map((attempt) =>
          attempt.isEditing && attempt.word.length > 0
            ? { ...attempt, word: attempt.word.slice(0, -1) }
            : attempt
        ),
      };
    }
    case "confirm":
      const editing = state.attempts.findIndex((attempt) => attempt.isEditing);

      if (
        editing === -1 ||
        !VALID_WORDS.includes(state.attempts[editing].word)
      ) {
        return state;
      }

      return {
        ...state,
        attempts: state.attempts
          .map((attempt, row) =>
            row === editing
              ? {
                  ...attempt,
                  isEditing: false,
                  colors: attempt.word
                    .split("")
                    .map((ch, i) =>
                      ch === state.answer[i]
                        ? "g"
                        : state.answer.includes(ch)
                        ? "y"
                        : "b"
                    ),
                }
              : attempt
          )
          .concat([{ isEditing: true, word: "" }]),
      };
  }
}
