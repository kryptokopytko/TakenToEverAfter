import styled from "styled-components";

export const SelectorContainer = styled.div`
  position: relative;
`;

export const DropdownMenu = styled.div<{
  isOpen: boolean;
  breakpoint?: string;
}>`
  position: absolute;
  top: 6.05rem;
  left: 0;
  background-color: ${({ theme }) => theme.light};
  border: 2px solid ${({ theme }) => theme.secondary};
  border-radius: 0.5rem;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  padding: 0.5rem;
  z-index: 50;
  min-width: 100%;

  @media (max-width: ${({ breakpoint }) => breakpoint}) {
    position: static;
    border: none;
    background-color: transparent;
    display: block;
    max-height: none;
  }
`;
DropdownMenu.shouldForwardProp = (prop) => prop !== "isOpen";

export const RadioButton = styled.label`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.7rem;
  margin-top: 0.7rem;

  cursor: pointer;
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

export const SelectorButton = styled.div`
  color: ${({ theme }) => theme.body};
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
