import styled from "styled-components";
import { Body, Heading } from "../themes/typography";
import Button, { ButtonContainer } from "./Button";
import { Card, GridContainer, SpaceBetweenContainer } from "../themes/section";
import { useState } from "react";

const BudgetContainer = styled.div`
  padding: 1rem 3rem;
`;

const choicesData = [
    {
        choice: 'Venue',
        options: [
            { option: 'Castle', amount: 700, isPicked: false },
            { option: 'Beach', amount: 300, isPicked: false },
            { option: 'Garden', amount: 400, isPicked: false },
            { option: 'Hotel', amount: 500, isPicked: false },
        ],
    },
    {
        choice: 'Catering',
        options: [
            { option: 'Buffet', amount: 50, isPicked: false },
            { option: 'Sit-down dinner', amount: 75, isPicked: false },
            { option: 'Barbecue', amount: 60, isPicked: true },
        ],
    },
    {
        choice: 'Decor',
        options: [
            { option: 'Floral arrangements', amount: 200, isPicked: true },
            { option: 'Balloon decorations', amount: 100, isPicked: false },
            { option: 'Fairy lights', amount: 150, isPicked: true },
        ],
    },
    {
        choice: 'Entertainment',
        options: [
            { option: 'Live band', amount: 1000, isPicked: true },
            { option: 'DJ', amount: 500, isPicked: false },
            { option: 'Photo booth', amount: 300, isPicked: true },
        ],
    },
    {
        choice: 'Photography',
        options: [
            { option: 'Professional photographer', amount: 1200, isPicked: false },
            { option: 'Videographer', amount: 1500, isPicked: false },
            { option: 'Photo package', amount: 800, isPicked: false },
        ],
    },
];

const Choices = () => {
    const [choices, setChoices] = useState(choicesData);
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleList = () => {
        setIsExpanded((prev) => !prev);
    };

    const handlePick = (choiceIndex: number, optionIndex: number) => {
        const newChoices = [...choices];
        newChoices[choiceIndex].options[optionIndex].isPicked = true;
        setChoices(newChoices);
    };

    const handleUnpick = (choiceIndex: number, optionIndex: number) => {
        const newChoices = [...choices];
        newChoices[choiceIndex].options[optionIndex].isPicked = false;
        setChoices(newChoices);
    };


    const totalPicked = choices.flatMap(choice => choice.options).filter(option => option.isPicked);
    const totalCount = totalPicked.length;
    const totalAmount = totalPicked.reduce((sum, option) => sum + option.amount, 0);

    return (
        <>
            <BudgetContainer>
                <SpaceBetweenContainer>
                    <Heading level={1}>Choices:</Heading>
                    <Heading level={1}>{totalCount} selected</Heading>
                    <Heading level={1}>Total: ${totalAmount}</Heading>
                </SpaceBetweenContainer>

                <GridContainer isExpanded={isExpanded} minWidth='28rem'>
                    {choices.map((choice, choiceIndex) => {
                        const selectedOptions = choice.options.filter(option => option.isPicked);
                        const selectedCount = selectedOptions.length;
                        const selectedAmount = selectedOptions.reduce((sum, option) => sum + option.amount, 0);

                        return (
                            <Card color='light' key={choiceIndex}>
                                <SpaceBetweenContainer border>
                                    <Heading level={4}>{choice.choice}</Heading>
                                    <Heading level={4}>
                                        {selectedCount} selected
                                    </Heading>
                                    <Heading level={4}>${selectedAmount}</Heading>
                                </SpaceBetweenContainer>

                                {choice.options.map((option, optionIndex) => (
                                    <SpaceBetweenContainer key={optionIndex} style={{ marginLeft: '1rem' }}>
                                        <Body size='big'>{option.option}</Body>
                                        <Body size='big'>${option.amount}</Body>
                                        {option.isPicked ? (
                                            <Button onClick={() => handleUnpick(choiceIndex, optionIndex)} variant='primary'>
                                                Unpick
                                            </Button>
                                        ) : (
                                            <Button onClick={() => handlePick(choiceIndex, optionIndex)}>
                                                Pick
                                            </Button>
                                        )}
                                    </SpaceBetweenContainer>
                                ))}
                            </Card>
                        );
                    })}
                </GridContainer>
                <ButtonContainer>
                    <Button>Add Choice</Button>
                    <Button>Manage Choices</Button>
                    <Button onClick={toggleList}>
                        {isExpanded ? 'Collapse List' : 'Expand List'}
                    </Button>
                </ButtonContainer>
            </BudgetContainer>
        </>
    );
};

export default Choices;
