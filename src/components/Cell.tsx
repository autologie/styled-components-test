import styled from "styled-components";
import { Color } from "../model/Color";

export const Cell = styled.div<{
  mb?: boolean;
  mr?: boolean;
  color?: Color;
}>`
  box-sizing: border-box;
  border: ${({ color }) =>
    color === undefined ? "2px solid #3a3a3c" : "none"};
  background-color: ${({ color }) =>
    color === undefined
      ? "transparent"
      : color === "b"
      ? "#3a3a3c"
      : color === "g"
      ? "#538d4e"
      : "#b59f3b"};
  margin: ${({ mb, mr }) => `0 ${mr ? 6 : 0}px ${mb ? 6 : 0}px 0`};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  font-size: 2.2rem;
  font-weight: 700;
  color: white;
`;
