import { MAX_ATTEMPTS, VALID_WORDS, WORD_LENGTH } from "../const";
import { isSolved, Attempt, finishEditing } from "./Attempt";

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
  | { type: "del" }
  | { type: "effectDone" };

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
    case "char":
      return {
        ...state,
        attempts: state.attempts.map((attempt) =>
          attempt.isEditing && attempt.word.length < WORD_LENGTH
            ? { ...attempt, word: `${attempt.word}${action.payload}` }
            : attempt
        ),
      };
    case "del":
      return {
        ...state,
        attempts: state.attempts.map((attempt) =>
          attempt.isEditing && attempt.word.length > 0
            ? { ...attempt, word: attempt.word.slice(0, -1) }
            : attempt
        ),
      };
    case "confirm":
      const editing = state.attempts.findIndex((attempt) => attempt.isEditing);
      const word = state.attempts[editing]?.word;

      if (
        word === undefined ||
        word.length < WORD_LENGTH ||
        !VALID_WORDS.includes(word)
      ) {
        return {
          ...state,
          attempts: state.attempts.map((attempt) =>
            attempt.isEditing ? { ...attempt, effect: "unacceptable" } : attempt
          ),
        };
      }

      return {
        ...state,
        attempts: state.attempts
          .map((attempt, row) =>
            row === editing ? finishEditing(attempt, state.answer) : attempt
          )
          .concat([{ isEditing: true, word: "" }]),
      };
    case "effectDone":
      return {
        ...state,
        attempts: state.attempts.map((attempt) => ({
          ...attempt,
          effect: undefined,
        })),
      };
  }
}
