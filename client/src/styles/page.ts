import styled from "styled-components";

export const notificationTimeOut = 10000;
export const guestAndThemeBreakpoint = "660px";
export const budgetBreakpoint = "1100px";

export const Notification = styled.span`
  color: ${({ theme }) => theme.body};
  margin: 1rem 0;
`;

export const Container = styled.div<{ isBudget?: boolean; color?: string }>`
  width: 100%;
  margin-bottom: 2rem;
  @media (min-width: ${({ isBudget }) =>
      isBudget ? `${budgetBreakpoint}` : `${guestAndThemeBreakpoint}`}) {
    position: relative;
    top: 1rem;
    min-height: 200vh;
    display: flex;
    align-items: flex-start;
  }
  & > *:last-child {
    background-color: ${({ theme, color }) =>
      color ? theme[color] : theme.primary};
    padding: 3rem 3rem;
    padding-top: 1rem;
    height: fit-content;
    margin-top: 1rem;
    @media (min-width: ${({ isBudget }) =>
        isBudget ? `${budgetBreakpoint}` : `${guestAndThemeBreakpoint}`}) {
      width: calc(100% - 30rem);
      margin: 0 1rem;
    }
  }
`;

export const MenuContainer = styled.div<{ color?: string; isBudget?: boolean }>`
  padding: 1rem 2rem;
  padding-bottom: 2rem;
  background-color: ${({ theme, color }) =>
    color ? theme[color] : theme.primary};
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: flex-start;
  width: calc(100% - 4rem);

  @media (min-width: ${({ isBudget }) =>
      isBudget ? `${budgetBreakpoint}` : `${guestAndThemeBreakpoint}`}) {
    width: 20rem;
    margin: 0 0.5rem;
    position: sticky;
    top: 6rem;
    left: 1rem;
    z-index: 10;
    max-height: calc(100vh - 9rem);
    overflow: auto;
  }

`;
