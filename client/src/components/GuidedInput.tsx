import React, { useState } from "react";
import styled from "styled-components";
import Input, { InputProps, InputContainer } from "./Input";

const SuggestionsList = styled.ul`
  list-style-type: none;
  margin: 0.5rem 0;
  padding: 0;
  max-height: 10rem;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: 0.5rem;
  width: 100%;
`;

const SuggestionItem = styled.li<{ isSelected: boolean }>`
  padding: 0.75rem;
  cursor: pointer;
  background-color: ${({ isSelected, theme }) =>
        isSelected ? theme.primary : theme.primary};
  color: ${({ isSelected, theme }) =>
        isSelected ? theme.body : theme.text};
  
  &:hover {
    background-color: ${({ theme }) => theme.light};
    color: ${({ theme }) => theme.body};
  }
`; 

interface GuidedInputProps extends InputProps {
    suggestions: string[];
    setInputValue?: (value: string) => void;
}

const GuidedInput: React.FC<GuidedInputProps> = ({ suggestions, setInputValue, placeholder, ...inputProps }) => {
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(-1);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [inputValue, setInputValueLocal] = useState<string>(inputProps.value || '');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const userInput = e.target.value;
        setInputValueLocal(userInput);

        const filtered = suggestions.filter(suggestion =>
            suggestion.toLowerCase().includes(userInput.toLowerCase())
        );

        setFilteredSuggestions(filtered);
        setActiveSuggestionIndex(-1);
        setShowSuggestions(!!userInput && filtered.length > 0);


        if (setInputValue) {
            setInputValue(userInput);
        }

        if (inputProps.onChange) {
            inputProps.onChange(e);
        }
    };

    const handleClick = (suggestion: string) => {
        setInputValueLocal(suggestion);
        setFilteredSuggestions([]);
        setShowSuggestions(false);
        if (setInputValue) {
            setInputValue(suggestion);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowDown") {
            if (activeSuggestionIndex < filteredSuggestions.length - 1) {
                setActiveSuggestionIndex(prevIndex => prevIndex + 1);
            }
        } else if (e.key === "ArrowUp") {
            if (activeSuggestionIndex > 0) {
                setActiveSuggestionIndex(prevIndex => prevIndex - 1);
            }
        } else if (e.key === "Enter") {
            if (activeSuggestionIndex >= 0 && filteredSuggestions[activeSuggestionIndex]) {
                handleClick(filteredSuggestions[activeSuggestionIndex]);
            }
        } else if (e.key === "Escape") {
            setShowSuggestions(false);
        }
    };

    return (
        <InputContainer>
            <Input
                {...inputProps}
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
            />
            {showSuggestions && (
                <SuggestionsList>
                    {filteredSuggestions.map((suggestion, index) => (
                        <SuggestionItem
                            key={suggestion}
                            isSelected={index === activeSuggestionIndex}
                            onClick={() => handleClick(suggestion)}
                        >
                            {suggestion}
                        </SuggestionItem>
                    ))}
                </SuggestionsList>
            )}
        </InputContainer>
    );
};

export default GuidedInput;
