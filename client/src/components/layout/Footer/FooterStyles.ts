import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem 0rem;
  background-color: ${({ theme }) => theme.light};
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  text-align: left;

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

export const Section = styled.div`
  flex: 1;
  min-width: 12rem;
  margin: 1rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 25rem;
`;

export const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(6rem, 1fr));
  margin-top: -2rem;
  gap: 0.5rem;
  width: 100%;
`;
