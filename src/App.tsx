import { Dispatch, useCallback, useEffect, useReducer } from "react";
import Wordle from "./components/Wordle";
import { Action, applyAction, getInitialState } from "./model/State";

function useKeyboardEvent(dispatch: Dispatch<Action>) {
  useEffect(() => {
    function handleKeyEvent(e: KeyboardEvent) {
      if (e.key === "Enter") {
        e.stopPropagation();
        dispatch({ type: "confirm" });
        return;
      }

      if (e.key === "Backspace") {
        e.stopPropagation();
        dispatch({ type: "del" });
        return;
      }

      if (
        e.shiftKey ||
        e.ctrlKey ||
        e.altKey ||
        e.metaKey ||
        !e.key.match(/^[a-z]{1,1}$/)
      ) {
        return;
      }

      e.stopPropagation();
      dispatch({ type: "char", payload: e.key });
    }

    window.addEventListener("keydown", handleKeyEvent);

    return () => {
      window.removeEventListener("keydown", handleKeyEvent);
    };
  }, [dispatch]);
}

export default function App() {
  const [{ attempts }, dispatch] = useReducer(
    applyAction,
    "query",
    getInitialState
  );
  const handleAnimationEnd = useCallback(
    () => dispatch({ type: "effectDone" }),
    []
  );

  useKeyboardEvent(dispatch);

  return <Wordle rows={attempts} onAnimationEnd={handleAnimationEnd} />;
}
