import styled from "styled-components";
import { Body } from "./typography";

export const Tag = styled(Body)`
  background-color: ${({ theme }) => theme.dark};
  color: ${({ theme }) => theme.primary};
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  height: fit-content;
  width: fit-content;
  &:hover {
    opacity: 0.9;
  }
`;

export const TagContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
`;
