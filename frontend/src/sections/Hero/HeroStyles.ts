import styled from "styled-components";

export const Container = styled.div`
  padding-top: 5rem !important;
`;

export const LinkList = styled.ul`
  & > * {
    margin: 0;
    padding: 0.5rem;
    &:hover {
      color: ${({ theme }) => theme.dark};
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (min-width: 1200px) {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
    align-items: center;
  }
`;

export const TextSection = styled.div`
  margin: 2rem 2rem;
  max-width: 34rem;
  @media (min-width: 1200px) {
    margin-left: 2rem;
    flex: 1;
    order: 2;
  }
`;

export const ImageSection = styled.div`
  @media (min-width: 1200px) {
    flex: 1;
    order: 1;
    margin-right: 2rem;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  @media (max-width: 1200px) {
    margin-top: -4rem;
  }
`;

export const HiddenText = styled.div`
  display: none;
  @media (min-width: 1200px) {
    display: block;
  }
`;

export const Image = styled.img`
  width: 70%;
  max-width: 60rem;
  margin: 1rem 2rem;
  margin-bottom: 0;

  @media (min-width: 1200px) {
    width: 60%;
  }

  @media (max-width: 800px) {
    width: 80%;
  }
`;