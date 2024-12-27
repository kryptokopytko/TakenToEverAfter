import React from "react";
import styled from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledInput = styled.input<{
    variant?: 'tertiary' | 'secondary';
    size?: 'small' | 'medium' | 'large' | 'long';
}>`
  background-color: ${({ variant, theme }) =>
        variant === 'tertiary' ? theme.tertiary :
            variant === 'secondary' ? theme.secondary :
                theme.primary};
  color: ${({ theme }) => theme.body};
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: 0.5rem;
  padding: ${({ size }) => (size === 'small' ? '0.5rem' : size === 'large' ? '1rem' : '0.75rem')};
  transition: border-color 0.3s ease;
  max-width: 100%;
  min-height: ${({ size }) => (size === 'long' ? '6rem' : 'auto')};
  white-space: ${({ size }) => (size === 'long' ? 'wrap' : 'nowrap')};

  &:focus {
    border-color: ${({ variant, theme }) =>
        variant === 'tertiary' ? theme.primary :
            variant === 'secondary' ? theme.secondary :
                theme.focusColor};
    outline: none;
    border: 2px solid ${({ theme }) => theme.tertiary};
  }
`;
StyledInput.shouldForwardProp = (prop) => !["variant", "size"].includes(prop);

const StyledTextArea = styled.textarea<{
    variant?: 'tertiary' | 'secondary';
}>`
  background-color: ${({ variant, theme }) =>
        variant === 'tertiary' ? theme.tertiary :
            variant === 'secondary' ? theme.secondary :
                theme.primary};
  color: ${({ theme }) => theme.body};
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: 0.5rem;
  padding: 1rem;
  transition: border-color 0.3s ease;
  max-width: 100%;
  min-height: 3rem;
  resize: vertical;

  &:focus {
    border-color: ${({ variant, theme }) =>
        variant === 'tertiary' ? theme.primary :
            variant === 'secondary' ? theme.secondary :
                theme.focusColor};
    outline: none;
    border: 2px solid ${({ theme }) => theme.tertiary};
  }
`;
StyledTextArea.shouldForwardProp = (prop) => !["variant"].includes(prop);


export interface InputProps {
    variant?: 'tertiary' | 'secondary';
    size?: 'small' | 'medium' | 'large' | 'long';
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder?: string;
    disabled?: boolean;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    type?: 'text' | 'number' | 'date' | 'email' | 'password';
}

const Input: React.FC<InputProps> = ({
    variant,
    size = 'medium',
    value,
    onChange,
    placeholder,
    disabled,
    type = 'text',
}) => {
    return (
        <InputContainer>
            {size === 'long' ? (
                <StyledTextArea
                    variant={variant}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                />
            ) : (
                <StyledInput
                    variant={variant}
                    size={size}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    type={type}
                />
            )}
        </InputContainer>
    );
};

export default Input;
