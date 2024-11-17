import React from 'react';
import { CheckboxLabel, CheckboxWrapper, StyledCheckbox, HiddenCheckbox } from '../styles/checkbox';

interface CheckboxProps {
    checked: boolean;
    onChange: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
    return (
        <CheckboxWrapper>
            <CheckboxLabel>
                <HiddenCheckbox
                    checked={checked}
                    onChange={onChange}
                />
                <StyledCheckbox checked={checked}>
                    <svg viewBox="8 4 10 14" width="18" height="18">
                        <polyline points="4 6 10 17 22 3 11 12" />
                    </svg>
                </StyledCheckbox>
            </CheckboxLabel>
        </CheckboxWrapper>
    );
};

export default Checkbox;
