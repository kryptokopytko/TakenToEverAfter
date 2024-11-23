import React from "react";
import styled from "styled-components";
import { Label } from "../../styles/typography";

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  flex-wrap: wrap;
`;

const StyledButton = styled.button<{ variant?: 'primary' | 'secondary' | 'transparent'; size?: 'small' | 'medium' | 'large'; hslColor?: string, minWidth?: string }>`
  background-color: ${({ variant, theme, hslColor }) =>
    variant === 'primary' ? theme.primary :
      variant === 'secondary' ? theme.secondary :
        variant === 'transparent' ? 'transparent' :
          hslColor ? hslColor : theme.tertiary};
    color: ${({ variant, theme }) =>
    !variant ? theme.primary : theme.body};
  border: none;
  border-radius: 0.5rem;
  margin-top: 2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  padding: 0 1.5rem;
  max-height: 5rem;
  min-width: ${({ minWidth }) => minWidth ? minWidth : 'auto'};
  &:hover {
    opacity: ${({ variant }) => variant === 'transparent' ? 0.5 : 0.9};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.disabledBackground || '#ccc'};
    cursor: not-allowed;
  }
`;

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'transparent';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  disabled?: boolean;
  hslColor?: string;
  children: React.ReactNode;
  minWidth?: string;
}

const Button: React.FC<ButtonProps> = ({ variant, size = 'medium', onClick, disabled, hslColor, minWidth, children }) => {
  return (
    <StyledButton variant={variant} size={size} onClick={onClick} hslColor={hslColor} disabled={disabled} minWidth={minWidth}>
      <Label size={'small'} color={variant ? 'body' : 'primary'}>
        {children}
      </Label>
    </StyledButton>
  );
};

export default Button;