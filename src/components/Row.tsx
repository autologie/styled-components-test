import styled from "styled-components";
import { WORD_LENGTH } from "../const";
import { Attempt, colorAt } from "../model/Attempt";
import { Cell } from "./Cell";

export const RowTemplate = styled.div`
  display: flex;
`;

export function Row({ mb, attempt }: { mb: boolean; attempt?: Attempt }) {
  return (
    <RowTemplate>
      {Array.from({ length: WORD_LENGTH }).map((_, col) => (
        <Cell
          key={col}
          mr={col !== WORD_LENGTH - 1}
          mb={mb}
          color={colorAt(attempt, col)}
        >
          {(attempt?.word[col] ?? "").toUpperCase()}
        </Cell>
      ))}
    </RowTemplate>
  );
}
