import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  margin: 5rem;
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
