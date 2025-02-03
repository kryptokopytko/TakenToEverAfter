import styled from "styled-components";
import { Body, Heading } from "../../styles/typography";
import Button, { ButtonContainer } from "../../components/ui/Button";
import PieChart from "./PieChart";
import { GridContainer, SpaceBetweenContainer } from "../../styles/section";
import { useState } from "react";
import { exportToPDF } from "../Printables/exportToPdf";
import { Card } from "../../styles/card";
import { Link } from "react-router-dom";
import { Description, DescriptionContainer } from "../../styles/Description";
import { useUser } from "../../providers/UserContext";
import { translations } from "../../translations";

const HeaderContainer = styled.div<{ isHomePage: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 3rem;
  @media (max-width: ${({ isHomePage }) => isHomePage ? '1100px' : '2000px'}) {
    grid-template-columns: 1fr;
  }
`;
HeaderContainer.shouldForwardProp = (prop) => prop !== "isHomePage";


interface BudgetProps {
    isHomePage?: boolean;
}

const Budget: React.FC<BudgetProps> = ({ isHomePage }) => {

    const [isExpanded, setIsExpanded] = useState(!isHomePage);
    const {expenseCards, language, accountDetails } = useUser();

    const toggleList = () => {
        setIsExpanded((prev) => !prev);
    };

    const totalSpent = expenseCards.reduce((total, card) => total +
        card.expenses.reduce((sum, exp) => sum + exp.amount, 0), 0);
    const totalBudget = accountDetails.budgetLimit || 3000;
    const remainingBudget = totalBudget - totalSpent;
    const pieData = expenseCards.map((expenseCard) => ({
        label: expenseCard.category,
        value: expenseCard.expenses.reduce((sum, exp) => sum + exp.amount, 0)
    })).sort((a, b) => b.value - a.value);

    if (remainingBudget > 0)
        pieData.push({ value: remainingBudget, label: translations[language].remaining });

    return (
        <div id='budget'>
            <HeaderContainer isHomePage={isHomePage ? isHomePage : false}>
                <div>
                    <SpaceBetweenContainer>
                        <Heading level={1}>{translations[language].budget + ":"}</Heading>
                        <Heading level={1}>${totalBudget}</Heading>
                    </SpaceBetweenContainer>
                    <SpaceBetweenContainer>
                        <Heading level={2}>{translations[language].remaining + ":"}</Heading>
                        <Heading level={2}>${remainingBudget}</Heading>
                    </SpaceBetweenContainer>
                    <SpaceBetweenContainer>
                        <Heading level={3}>{translations[language].spent + ":"}</Heading>
                        <Heading level={3}>${totalSpent}</Heading>
                    </SpaceBetweenContainer>
                </div>
                <PieChart data={pieData} />
            </HeaderContainer>
            <GridContainer isExpanded={isExpanded}>
                {expenseCards.map((expenseCard, index) => (
                    <Card color='light' key={index}>

                        <SpaceBetweenContainer border>
                            <Heading level={4}>{expenseCard.category}</Heading>
                            <Heading level={4}>${expenseCard.expenses.reduce((sum, exp) => sum + exp.amount, 0)}</Heading>
                        </SpaceBetweenContainer>

                        {expenseCard.expenses.map((expense, subIndex) => (
                            <div style={{ position: 'relative' }} key={subIndex}>
                                <SpaceBetweenContainer key={subIndex} style={{ marginLeft: '1rem' }}>
                                    <Body size='big'>{expense.name}</Body>
                                    <Body size='big'>${expense.amount}</Body>
                                </SpaceBetweenContainer>
                                {expense.description && (<DescriptionContainer move={-1}>
                                    <Description>{expense.description}</Description>
                                </DescriptionContainer>)}
                            </div>
                        ))}
                    </Card>
                ))}
            </GridContainer>
            <ButtonContainer>
                {isHomePage ? <>
                    <Link to="budget">
                        <Button>{translations[language].manageBudget}</Button></Link>
                    <Button onClick={toggleList}>
                        {isExpanded ? translations[language].collapseList : translations[language].expandList}
                    </Button>
                </> : <></>}
                <Button onClick={() => exportToPDF("budget")}>{translations[language].exportToPDF}</Button>

            </ButtonContainer>
        </div>
    );
};

export default Budget;
