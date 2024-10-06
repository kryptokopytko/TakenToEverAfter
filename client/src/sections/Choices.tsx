import { Body, Heading } from "../styles/typography";
import Button, { ButtonContainer } from "../components/Button";
import { GridContainer, SpaceBetweenContainer } from "../styles/section";
import { useEffect, useState } from "react";
import { Card } from "../styles/card";
import { Choice } from "../types";
import { handleChoicePick } from "../dummyDBApi";
import styled from "styled-components";

const LimitedWidth = styled.span`
    max-width: 60%;
`

interface ChoicesProps {
    isHomePage?: boolean;
    initialChoices: Choice[];
}

const Choices: React.FC<ChoicesProps> = ({ isHomePage, initialChoices }) => {
    const [choices, setChoices] = useState(initialChoices);
    const [isExpanded, setIsExpanded] = useState(!isHomePage);

    useEffect(() => {
        setChoices(initialChoices);
    }, [initialChoices]);


    const toggleList = () => {
        setIsExpanded((prev) => !prev);
    };

    const handlePick = (choiceIndex: number, optionIndex: number) => {
        const newChoices = [...choices];
        newChoices[choiceIndex].options[optionIndex].isPicked = true;
        setChoices(newChoices);
        const { option } = newChoices[choiceIndex].options[optionIndex];
        handleChoicePick(option, newChoices[choiceIndex].choice, true);
    };

    const handleUnpick = (choiceIndex: number, optionIndex: number) => {
        const newChoices = [...choices];
        newChoices[choiceIndex].options[optionIndex].isPicked = false;
        setChoices(newChoices);
        const { option } = newChoices[choiceIndex].options[optionIndex];
        handleChoicePick(option, newChoices[choiceIndex].choice, false);
    };

    const totalPicked = choices.flatMap(choice => choice.options).filter(option => option.isPicked);
    const totalCount = totalPicked.length;
    const totalAmount = totalPicked.reduce((sum, option) => sum + option.amount, 0);

    return (
        <div>
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
                                    <LimitedWidth>
                                        <Body size='big'>{option.option}</Body>
                                    </LimitedWidth>
                                    <LimitedWidth>
                                        <Body size='big'>${option.amount}</Body>
                                    </LimitedWidth><LimitedWidth>
                                        {option.isPicked ? (
                                            <Button onClick={() => handleUnpick(choiceIndex, optionIndex)} variant='primary'>
                                                Unpick
                                            </Button>
                                        ) : (
                                            <Button onClick={() => handlePick(choiceIndex, optionIndex)}>
                                                Pick
                                            </Button>
                                        )}
                                    </LimitedWidth>
                                </SpaceBetweenContainer>
                            ))}
                        </Card>
                    );
                })}
            </GridContainer>
            <ButtonContainer>
                {isHomePage ?
                    <Button>Manage Choices</Button> : <></>}
                <div style={{ display: isHomePage ? 'block' : 'none' }}>
                    <Button onClick={toggleList} >
                        {isExpanded ? 'Collapse List' : 'Expand List'}
                    </Button>
                </div>
            </ButtonContainer>
        </div>
    );
};

export default Choices;
