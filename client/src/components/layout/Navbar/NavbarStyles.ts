import styled from "styled-components";

export const BurgerBreakpoint = "1050px";

export const NavbarContainer = styled.nav`
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.body};
  position: fixed;
  top: 0;
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

export const ThemeSelectorContainer = styled.div`
  position: relative;
`;

export const NamesContainer = styled.div`
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

    div {
      width: 1.5rem;
      height: 2px;
      background-color: ${({ theme }) => theme.primary};
    }
  }
`;

export const SelectorButton = styled.div`
  color: ${({ theme }) => theme.body};
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 6.05rem;
  left: 0;
  background-color: ${({ theme }) => theme.light};
  border: 2px solid ${({ theme }) => theme.secondary};
  border-radius: 0.5rem;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  padding: 0.5rem;
  z-index: 101;
  width: 100%;
  @media (min-width: ${BurgerBreakpoint}) {
    max-height: 85vh;
    overflow: auto;
  }
  @media (max-width: ${BurgerBreakpoint}) {
    position: static;
    border: none;
    background-color: transparent;
    display: block;
    max-height: none;
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
    max-height: calc(100vh - 6rem);
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

export const RadioButton = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  margin: -1rem 0;
  input {
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid ${({ theme }) => theme.dark};
    border-radius: 50%;
    cursor: pointer;
    outline: none;
    position: relative;
    background-color: transparent;
    transition: background-color 0.3s, border-color 0.3s;
  }

  &:hover {
    opacity: 0.5;
    border-radius: 0.5rem;
  }

  input:checked {
    border-color: ${({ theme }) => theme.dark};
  }

  input:checked::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.dark};
    transform: translate(-50%, -50%);
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  gap: 1rem;
  @media (max-width: 520px) {
    margin-top: -1.1rem;
  }
`;
