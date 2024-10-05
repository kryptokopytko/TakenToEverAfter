import styled from "styled-components";
import { Body, Heading } from "../styles/typography";
import Button, { ButtonContainer } from "../components/Button";
import PieChart from "../components/PieChart";
import { GridContainer, SpaceBetweenContainer } from "../styles/section";
import { useState } from "react";
import { exportToPDF } from "./Printables/exportToPdf";
import { Card } from "../styles/card";

const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 3rem;
  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

const expenses = [
    {
        category: 'Venue',
        subExpenses: [
            { subCategory: 'Rental', amount: 700 },
            { subCategory: 'Cleaning', amount: 300 },
        ],
    },

    {
        category: 'Photography',
        subExpenses: [
            { subCategory: 'Photographer', amount: 250 },
            { subCategory: 'Album', amount: 50 },
        ],
    },

    {
        category: 'Entertainment',
        subExpenses: [
            { subCategory: 'DJ', amount: 80 },
            { subCategory: 'Games', amount: 20 },
        ],
    },
    {
        category: 'Catering',
        subExpenses: [
            { subCategory: 'Dinner', amount: 300 },
            { subCategory: 'Vodka', amount: 50 },
            { subCategory: 'Vine', amount: 300 },
            { subCategory: 'Supper', amount: 200 },
            { subCategory: 'Ice Cream', amount: 100 },
        ],
    },
    {
        category: 'Decorations',
        subExpenses: [
            { subCategory: 'Flowers', amount: 100 },
            { subCategory: 'Lighting', amount: 100 },
        ],
    },
];
const totalSpent = expenses.reduce((total, expense) => total +
    expense.subExpenses.reduce((sum, exp) => sum + exp.amount, 0), 0);
const totalBudget = 3000;
const remainingBudget = totalBudget - totalSpent;
const pieData = expenses.map((expense) => ({
    label: expense.category,
    value: expense.subExpenses.reduce((sum, exp) => sum + exp.amount, 0)
})).sort((a, b) => b.value - a.value);

if (remainingBudget > 0)
    pieData.push({ value: remainingBudget, label: 'Remaining' });

interface BudgetProps {
    isHomePage?: boolean;
}

const Budget: React.FC<BudgetProps> = ({ isHomePage }) => {

    const [isExpanded, setIsExpanded] = useState(!isHomePage);

    const toggleList = () => {
        setIsExpanded((prev) => !prev);
    };

    return (
        <div id='budget'>
            <HeaderContainer>
                <div>
                    <SpaceBetweenContainer>
                        <Heading level={1}>Budget:</Heading>
                        <Heading level={1}>${totalBudget}</Heading>
                    </SpaceBetweenContainer>
                    <SpaceBetweenContainer>
                        <Heading level={2}>Remaining:</Heading>
                        <Heading level={2}>${remainingBudget}</Heading>
                    </SpaceBetweenContainer>
                    <SpaceBetweenContainer>
                        <Heading level={3}>Spent:</Heading>
                        <Heading level={3}>${totalSpent}</Heading>
                    </SpaceBetweenContainer>
                </div>
                <PieChart data={pieData} />
            </HeaderContainer>
            <GridContainer isExpanded={isExpanded}>
                {expenses.map((expense, index) => (
                    <Card color='light' key={index}>

                        <SpaceBetweenContainer border>
                            <Heading level={4}>{expense.category}</Heading>
                            <Heading level={4}>${expense.subExpenses.reduce((sum, exp) => sum + exp.amount, 0)}</Heading>
                        </SpaceBetweenContainer>

                        {expense.subExpenses.map((subExpense, subIndex) => (
                            <SpaceBetweenContainer key={subIndex} style={{ marginLeft: '1rem' }}>
                                <Body size='big'>{subExpense.subCategory}</Body>
                                <Body size='big'>${subExpense.amount}</Body>
                            </SpaceBetweenContainer>
                        ))}
                    </Card>
                ))}
            </GridContainer>
            <ButtonContainer>
                {isHomePage ? <>
                    <Button>Manage budget</Button>
                    <Button onClick={toggleList}>
                        {isExpanded ? 'Collapse List' : 'Expand List'}
                    </Button>
                </> : <></>}
                <Button onClick={() => exportToPDF("budget")}>Export to PDF</Button>

            </ButtonContainer>
        </div>
    );
};

export default Budget;
