import { Body, Heading } from "../styles/typography";
import Button, { ButtonContainer } from "../components/ui/Button";
import { GridContainer, SpaceBetweenContainer } from "../styles/section";
import { useState } from "react";
import { Card } from "../styles/card";
import useFunctionsProxy from "../API/FunctionHandler";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Description, DescriptionContainer } from "../styles/Description";
import { useUser } from "../providers/UserContext";

const LimitedWidth = styled.span`
    max-width: 50%;
`

interface ChoicesProps {
    isHomePage?: boolean;
}

const Choices: React.FC<ChoicesProps> = ({ isHomePage }) => {
    const [isExpanded, setIsExpanded] = useState(!isHomePage);
    const FunctionsProxy = useFunctionsProxy();

    const {choices} = useUser();

    const toggleList = () => {
        setIsExpanded((prev) => !prev);
    };

    const handlePick = (choiceId: number, categoryId: number) => {
        FunctionsProxy.handleChoicePick(choiceId, categoryId);
    };

    return (
        <div>
            <SpaceBetweenContainer>
                <Heading level={1}>Choices:</Heading>
            </SpaceBetweenContainer>

            <GridContainer isExpanded={isExpanded} minWidth='28rem'>
                {choices.map((choice, choiceIndex) => {

                    return (
                        <Card color='light' key={choiceIndex}>
                            <SpaceBetweenContainer border>
                                <Heading level={4}>{choice.category}</Heading>
                            </SpaceBetweenContainer>

                            {choice.options.map((option, optionIndex) => (
                                <SpaceBetweenContainer key={optionIndex} style={{ marginLeft: '1rem', position: 'relative' }}>
                                    <LimitedWidth>
                                        <Body size='big'>{option.name}</Body>
                                    </LimitedWidth>
                                    <LimitedWidth>
                                        <Body size='big'>${option.amount}</Body>
                                    </LimitedWidth>
                                    <LimitedWidth>
                                        <Button onClick={() => handlePick(option.id, choice.id)}>
                                            Pick
                                        </Button>
                                    </LimitedWidth>
                                    <DescriptionContainer rmove={-8}>
                                        <Description>{option.description}</Description>
                                    </DescriptionContainer>

                                </SpaceBetweenContainer>
                            ))}
                        </Card>
                    );
                })}
            </GridContainer>
            <ButtonContainer>
                {isHomePage ?
                    <Link to="/choices">
                        <Button>Manage Choices</Button>
                    </Link>
                    : <></>}
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
