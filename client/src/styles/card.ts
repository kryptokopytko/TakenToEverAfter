import styled from "styled-components";

export const Card = styled.div<{ color: string; centered?: string }>`
  background-color: ${({ theme, color }) => theme[color]};
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.secondary};
  box-shadow: 0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: ${({ centered }) => centered};
`;
