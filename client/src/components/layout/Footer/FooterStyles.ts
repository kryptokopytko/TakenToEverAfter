import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem 0rem;
  position: relative;

  z-index: 1;
  background-color: ${({ theme }) => theme.light};
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  text-align: center;
  align-items: center;
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
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

export const HidingSection = styled(Section)`
  @media (max-width: 850px) {
    display: none;
  }
`;

export const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr));
  margin-top: -1rem;
  width: 100%;
  height: fit-content;
  text-align: center;
  gap: 2px;
  padding: 2px;

  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  & > * {
    background-color: ${({ theme }) => theme.light};
    margin: 0rem;
    padding: 0.2rem;

    &:hover {
      border-radius: 1rem;
      background-color: ${({ theme }) => theme.primary};
    }
  }
`;
