import styled from "styled-components";
import { MAX_ATTEMPTS } from "../const";
import { Attempt } from "../model/Attempt";
import { Row } from "./Row";

const WordleTemplate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

export default function Wordle({
  rows,
  onAnimationEnd,
}: {
  rows: Attempt[];
  onAnimationEnd: () => void;
}) {
  return (
    <WordleTemplate>
      {Array.from({ length: MAX_ATTEMPTS }).map((_, row) => (
        <Row
          key={row}
          mb={row !== MAX_ATTEMPTS - 1}
          attempt={rows[row]}
          onAnimationEnd={onAnimationEnd}
        />
      ))}
    </WordleTemplate>
  );
}
