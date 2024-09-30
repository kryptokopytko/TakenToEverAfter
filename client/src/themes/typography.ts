import styled, { css } from "styled-components";

interface HeadingProps {
  level: 1 | 2 | 3 | 4;
  color?: string;
}

interface SubtitleProps {
  level: 1 | 2 | 3 | 4;
  color?: string;
}

interface BodyProps {
  size?: "big" | "small" | "bold";
  color?: string;
  hslColor?: string;
}

interface LabelProps {
  size?: "big" | "small" | "bold" | "extraSmall";
  color?: string;
}

const fontStyles = {
  headingFont: "'Great Vibes', cursive",
  bodyFont: "'Didact Gothic', sans-serif",
  labelFont: "'Dancing Script', cursive",
};

const Heading = styled.h1<HeadingProps>`
  font-family: ${fontStyles.headingFont};
  color: ${({ color, theme }) =>
    color && theme[color] ? theme[color] : theme.body};
  ${({ level }) =>
    level === 1 &&
    css`
      font-size: 5rem;
      font-weight: 700;
    `}
  ${({ level }) =>
    level === 2 &&
    css`
      font-size: 4rem;
      font-weight: 600;
    `}
  ${({ level }) =>
    level === 3 &&
    css`
      font-size: 3rem;
      font-weight: 500;
    `}
  ${({ level }) =>
    level === 4 &&
    css`
      font-size: 2rem;
      font-weight: 400;
    `}
`;

const Subtitle = styled.h2<SubtitleProps>`
  font-family: ${fontStyles.headingFont};
  color: ${({ color, theme }) =>
    color && theme[color] ? theme[color] : theme.body};
  ${({ level }) =>
    level === 1 &&
    css`
      font-size: 3.5rem;
      font-weight: 500;
    `}
  ${({ level }) =>
    level === 2 &&
    css`
      font-size: 2.5rem;
      font-weight: 400;
    `}
  ${({ level }) =>
    level === 3 &&
    css`
      font-size: 2rem;
      font-weight: 400;
    `}
  ${({ level }) =>
    level === 4 &&
    css`
      font-size: 1.5rem;
      font-weight: 400;
    `}
`;

const Body = styled.p<BodyProps>`
  font-family: ${fontStyles.bodyFont};
  color: ${({ color, theme }) =>
    color && theme[color] ? theme[color] : theme.body};
  color: ${({ hslColor }) => hslColor};

  ${({ size }) =>
    size === "big" &&
    css`
      font-size: 1.25rem;
      font-weight: 400;
    `}
  ${({ size }) =>
    size === "small" &&
    css`
      font-size: 0.875rem;
      font-weight: 400;
    `}
  ${({ size }) =>
    size === "bold" &&
    css`
      font-size: 1rem;
      font-weight: 600;
    `}
`;

const Label = styled.p<LabelProps>`
  font-family: ${fontStyles.labelFont};
  color: ${({ color, theme }) =>
    color && theme[color] ? theme[color] : theme.body};
  font-size: 2rem;

  ${({ size }) =>
    size === "big" &&
    css`
      font-size: 2.5rem;
      font-weight: 700;
    `}
  ${({ size }) =>
    size === "small" &&
    css`
      font-size: 1.5rem;
      font-weight: 400;
    `}
     ${({ size }) =>
    size === "extraSmall" &&
    css`
      font-size: 1rem;
      font-weight: 400;
    `}
  ${({ size }) =>
    size === "bold" &&
    css`
      font-size: 2rem;
      font-weight: 700;
    `}
`;

export { Heading, Subtitle, Body, Label };
