import styled from "styled-components";
import { Link } from "react-router-dom";
import { DropdownMenu } from "../../Dropdown/DropdownStyles";
import { BurgerBreakpoint } from "../../../styles/Breakpoints";

export const NavbarContainer = styled.nav`
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.body};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  height: 5rem;
`;

export const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  height: 100%;
`;

export const DateContainer = styled.div`
  display: flex;
  gap: 2rem;
  @media (max-width: 400px) {
    display: none;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  min-width: 11rem;
`;

export const NamesContainer = styled.div`
  text-decoration: none important!;
  display: flex;
  align-items: center;
  @media (max-width: 520px) {
    display: none;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: ${BurgerBreakpoint}) {
    display: none;
  }
`;

export const BurgerMenu = styled.div`
  display: none;

  @media (max-width: ${BurgerBreakpoint}) {
    display: flex;
    cursor: pointer;
    flex-direction: column;
    gap: 0.3rem;
    padding: 1rem;
    div {
      width: 1.5rem;
      height: 2px;
      background-color: ${({ theme }) => theme.primary};
    }
  }
`;

export const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: none;

  @media (max-width: ${BurgerBreakpoint}) {
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    position: absolute;
    top: 5rem;
    left: 0;
    width: 100%;
    background-color: ${({ theme }) => theme.light};
    gap: 1rem;
    justify-content: space-around;
    z-index: 100;
    flex-wrap: wrap;
    padding: 1rem;
    height: calc(100vh - 6rem);
    overflow: auto;
  }
  @media (max-width: 420px) {
    justify-content: flex-start;
  }

  ${DropdownMenu} {
    display: block;
    position: static;
    border: none;
    background-color: transparent;
    padding: 0;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  gap: 1rem;
`;
