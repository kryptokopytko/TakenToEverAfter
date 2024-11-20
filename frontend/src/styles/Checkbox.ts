import styled from "styled-components";

export const CustomCheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const CustomCheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 0;
`;

export const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const StyledCheckbox = styled.div<{ checked: boolean }>`
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  background: ${({ checked, theme }) =>
    checked ? theme.secondary : theme.light};
  border: 2px solid ${({ theme }) => theme.secondary};
  border-radius: 0.25rem;
  transition: all 150ms;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  svg {
    visibility: ${({ checked }) => (checked ? "visible" : "hidden")};
    fill: white;
  }
`;
