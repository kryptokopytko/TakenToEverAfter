import React, { useState, useEffect } from "react";
import { SelectorContainer, DropdownMenu, RadioButton, SelectorButton } from "./DropdownStyles";
import { Subtitle } from "../../../styles/typography";

interface Option {
    label: string;
    value: string;
}

interface DropdownSelectorProps {
    options: Option[];
    onOptionSelect?: (option: string | string[]) => void;
    title: string;
    initialSelectedOption?: string | string[];
    multiSelect?: boolean;
    color?: string;
}

const DropdownSelector: React.FC<DropdownSelectorProps> = ({ options, onOptionSelect, title, initialSelectedOption, color, multiSelect = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    useEffect(() => {
        if (initialSelectedOption) {
            if (multiSelect && Array.isArray(initialSelectedOption)) {
                setSelectedOptions(initialSelectedOption);
            } else if (!multiSelect && typeof initialSelectedOption === "string") {
                setSelectedOptions([initialSelectedOption]);
            }
        }
    }, [initialSelectedOption, multiSelect]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option: Option) => {
        if (multiSelect) {
            const newSelectedOptions = selectedOptions.includes(option.value)
                ? selectedOptions.filter(value => value !== option.value)
                : [...selectedOptions, option.value];
            setSelectedOptions(newSelectedOptions);
            if (onOptionSelect) {
                onOptionSelect(newSelectedOptions);
            }
        } else {
            setSelectedOptions([option.value]);
            setIsOpen(false);
            if (onOptionSelect) {
                onOptionSelect(option.value);
            }
        }
    };

    return (
        <SelectorContainer>
            <SelectorButton onClick={toggleDropdown}>
                <Subtitle color={color} level={3}>{title} {isOpen ? "▵" : "▿"}</Subtitle>
            </SelectorButton>
            <DropdownMenu isOpen={isOpen}>
                {options.length ?
                    options.map((option) => (
                        <RadioButton key={option.value}>
                            <input
                                type={multiSelect ? "checkbox" : "radio"}
                                name="dropdown"
                                checked={selectedOptions.includes(option.value)}
                                onChange={() => handleOptionClick(option)}
                            />
                            {option.label}
                        </RadioButton>
                    )) : "list is empty"}
            </DropdownMenu>
        </SelectorContainer>
    );
};

export default DropdownSelector;
