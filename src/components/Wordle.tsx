import styled from "styled-components";
import { MAX_ATTEMPTS, WORD_LENGTH } from "../const";
import { Attempt } from "../model/Attempt";
import { Cell } from "./Cell";
import { Row } from "./Row";

const WordleTemplate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

export default function Wordle({ rows }: { rows: Attempt[] }) {
  return (
    <WordleTemplate>
      {Array.from({ length: MAX_ATTEMPTS }).map((_, row) => {
        const attempt = rows[row];

        return (
          <Row key={row}>
            {Array.from({ length: WORD_LENGTH }).map((_, col) => {
              return (
                <Cell
                  key={col}
                  mr={col !== WORD_LENGTH - 1}
                  mb={row !== MAX_ATTEMPTS - 1}
                  color={
                    attempt === undefined || attempt.isEditing
                      ? undefined
                      : attempt.colors[col]
                  }
                >
                  {(attempt?.word[col] ?? "").toUpperCase()}
                </Cell>
              );
            })}
          </Row>
        );
      })}
    </WordleTemplate>
  );
}
