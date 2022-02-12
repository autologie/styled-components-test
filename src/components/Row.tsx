import styled, { css, keyframes } from "styled-components";
import { WORD_LENGTH } from "../const";
import { Attempt, colorAt } from "../model/Attempt";
import { Effect } from "../model/Effect";
import { Cell } from "./Cell";

const shake = keyframes`
  0% {
    margin-left: 8px;
  }
  50% {
    margin-left: -8px;
  }
`;

export const RowTemplate = styled.div<{ effect?: Effect }>`
  display: flex;
  animation: ${({ effect }) =>
    effect === "unacceptable"
      ? css`
          linear ${shake} .2s 5
        `
      : "none"};
`;

export function Row({
  mb,
  attempt,
  onAnimationEnd,
}: {
  mb: boolean;
  attempt?: Attempt;
  onAnimationEnd: () => void;
}) {
  return (
    <RowTemplate
      effect={attempt?.effect}
      onAnimationEnd={
        attempt?.effect === "unacceptable" ? onAnimationEnd : undefined
      }
    >
      {Array.from({ length: WORD_LENGTH }).map((_, col) => (
        <Cell
          key={col}
          mr={col !== WORD_LENGTH - 1}
          mb={mb}
          color={colorAt(attempt, col)}
          effectDelay={attempt?.effect === "accepted" ? col : undefined}
        >
          {(attempt?.word[col] ?? "").toUpperCase()}
        </Cell>
      ))}
    </RowTemplate>
  );
}
