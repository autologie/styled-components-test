import styled, { keyframes } from "styled-components";
import { Color } from "../model/Color";

const conceal = keyframes`
  0% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1, 0);
  }
  100% {
    transform: scale(1, 0);
  }
`;

const reveal = keyframes`
  0% {
    transform: scale(1, 0);
  }
  50% {
    transform: scale(1, 0);
  }
  100% {
    transform: scale(1, 1);
  }
`;

export const CellTemplate = styled.div<{
  mb?: boolean;
  mr?: boolean;
}>`
  position: relative;
  margin: ${({ mb, mr }) => `0 ${mr ? 6 : 0}px ${mb ? 6 : 0}px 0`};
  font-size: 2.2rem;
  font-weight: 700;
  color: white;
  width: 4rem;
  height: 4rem;
`;

export const Panel = styled.div<{ effectDelay?: number }>`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  animation-fill-mode: forwards;
  animation-delay: ${({ effectDelay }) => `${(effectDelay ?? 0) / 8}s`};
  animation-duration: 0.5s;
  animation-direction: normal;
`;

export const GuessPanel = styled(Panel)<{
  animate: boolean;
}>`
  box-sizing: border-box;
  border: 2px solid #3a3a3c;
  animation-name: ${({ animate }) => (animate ? conceal : undefined)};
`;

export const RevealedPanel = styled(Panel)<{
  color?: Color;
}>`
  background-color: ${({ color }) =>
    color === "g"
      ? "#538d4e"
      : color === "y"
      ? "#b59f3b"
      : color === "b"
      ? "#3a3a3c"
      : undefined};
  animation-name: ${({ color }) => (color === undefined ? undefined : reveal)};
`;

export function Cell({
  mb,
  mr,
  color,
  effectDelay,
  children,
}: {
  mb?: boolean;
  mr?: boolean;
  color?: Color;
  effectDelay?: number;
  children: string;
}) {
  return (
    <CellTemplate mb={mb} mr={mr}>
      <GuessPanel animate={color !== undefined} effectDelay={effectDelay}>
        {children}
      </GuessPanel>
      <RevealedPanel color={color} effectDelay={effectDelay}>
        {children}
      </RevealedPanel>
    </CellTemplate>
  );
}
