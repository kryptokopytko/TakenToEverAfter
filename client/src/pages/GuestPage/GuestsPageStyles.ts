import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  padding: 3rem;
  padding-top: 0;
  & > *:last-child {
    background-color: ${({ theme }) => theme.primary};
    padding: 0 3rem;
    flex: 100;
  }
`;

export const MenuContainer = styled.div`
  padding: 0 2rem;
  padding-bottom: 2rem;
  background-color: ${({ theme }) => theme.light};
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  height: fit-content;
  min-width: 22rem;
  flex: 1 1 auto;
`;

export const Notification = styled.span`
  color: ${({ theme }) => theme.body};
  margin: 1rem 0;
`;
