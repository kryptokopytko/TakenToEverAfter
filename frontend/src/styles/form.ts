import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const Form = styled.div`
  background-color: ${({ theme }) => theme.primary};
  width: 25rem;
  @media (max-width: 400px) {
    width: 100vw padding 2rem;
  }
  padding: 3rem 5rem;
  height: fit-content;
`;
