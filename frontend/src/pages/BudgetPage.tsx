import { Heading, Subtitle } from "../styles/typography";
import Budget from "../sections/Budget/Budget";
import { Container, MenuContainer, Notification, notificationTimeOut } from "../styles/page";
import Input from "../components/ui/Input";
import { useState, useEffect } from "react";
import { expenses as initialExpenses } from "../exampleData";
import GuidedInput from "../components/ui/GuidedInput";
import Button, { ButtonContainer } from "../components/ui/Button";
import { SubExpense } from "../types";
import { addExpense, removeExpense, updateExpense } from "../DBApi";

interface BudgetPageProps { }

const BudgetPage: React.FC<BudgetPageProps> = () => {
    const [inputExpenseName, setInputExpenseName] = useState('');
    const [inputExpensePrice, setInputExpensePrice] = useState('');
    const [inputCategory, setInputCategory] = useState('');
    const [expenses, setExpenses] = useState(initialExpenses);
    const [existingExpense, setExistingExpense] = useState<SubExpense | null>(null);
    const [notification, setNotification] = useState<string | null>(null);
    const [inputExpenseDescription, setInputExpenseDescription] = useState('');

    const expenseNames = expenses.flatMap(expense =>
        expense.subExpenses.map(subExpense => subExpense.subCategory.toLowerCase())
    );

    const categories = expenses.map(expense => expense.category.toLowerCase());

    useEffect(() => {
        const normalizedCategory = inputCategory.trim().toLowerCase();
        const normalizedExpenseName = inputExpenseName.trim().toLowerCase();
        const category = expenses.find(expense => expense.category.toLowerCase() === normalizedCategory);

        if (category) {
            const existingSubExpense = category.subExpenses.find(sub => sub.subCategory.toLowerCase() === normalizedExpenseName);
            if (existingSubExpense) {
                setExistingExpense(existingSubExpense);
                setInputExpensePrice(existingSubExpense.amount.toString());
            } else {
                setExistingExpense(null);
            }
        } else {
            setExistingExpense(null);
        }
    }, [inputExpenseName, inputCategory, expenses]);

    const handleAddExpense = () => {
        const expenseAmount = Number(inputExpensePrice);
        const normalizedCategory = inputCategory.toLowerCase();
        const normalizedExpenseName = inputExpenseName.toLowerCase();
        const categoryExists = categories.includes(normalizedCategory);

        if (categoryExists) {
            setExpenses(prevExpenses => {
                return prevExpenses.map(expense => {
                    if (expense.category.toLowerCase() === normalizedCategory) {
                        const existingSubExpense = expense.subExpenses.find(
                            subExpense => subExpense.subCategory.toLowerCase() === normalizedExpenseName
                        );

                        if (existingSubExpense) {

                            return {
                                ...expense,
                                subExpenses: expense.subExpenses.map(subExpense =>
                                    subExpense.subCategory.toLowerCase() === normalizedExpenseName
                                        ? { ...subExpense, amount: expenseAmount, description: inputExpenseDescription }
                                        : subExpense
                                )
                            };
                        } else {

                            return {
                                ...expense,
                                subExpenses: [
                                    ...expense.subExpenses,
                                    { subCategory: inputExpenseName, amount: expenseAmount, description: inputExpenseDescription }
                                ]
                            };
                        }
                    }
                    return expense;
                });
            });
            setNotification(`Expense "${inputExpenseName}" updated in category "${inputCategory}"`);
            updateExpense(inputCategory, inputExpenseName, expenseAmount, inputExpenseDescription);
        } else {

            setExpenses(prevExpenses => [
                ...prevExpenses,
                {
                    category: inputCategory,
                    subExpenses: [
                        { subCategory: inputExpenseName, amount: expenseAmount, description: inputExpenseDescription }
                    ]
                }
            ]);
            setNotification(`Expense "${inputExpenseName}" added to new category "${inputCategory}"`);
            addExpense(inputCategory, inputExpenseName, expenseAmount, inputExpenseDescription);
        }
        setTimeout(() => setNotification(null), notificationTimeOut);

        
        setInputExpenseName('');
        setInputExpensePrice('');
        setInputCategory('');
        setInputExpenseDescription('');
    };


    const handleRemoveExpense = () => {
        const normalizedCategory = inputCategory.toLowerCase();

        setExpenses(prevExpenses =>
            prevExpenses
                .map(expense => {
                    if (expense.category.toLowerCase() === normalizedCategory) {
                        const updatedSubExpenses = expense.subExpenses.filter(
                            subExpense => subExpense.subCategory.toLowerCase() !== inputExpenseName.toLowerCase()
                        );
                        return {
                            ...expense,
                            subExpenses: updatedSubExpenses
                        };
                    }
                    return expense;
                })
                .filter(expense => expense.subExpenses.length > 0)
        );

        setNotification(`Expense "${inputExpenseName}" removed from category "${inputCategory}"`);
        removeExpense(inputCategory, inputExpenseName);
        setTimeout(() => setNotification(null), notificationTimeOut);
    };

    const isInputValid = () => {
        const expenseAmount = Number(inputExpensePrice);
        return (
            inputExpenseName.trim() !== '' &&
            inputExpensePrice.trim() !== '' &&
            !isNaN(expenseAmount) &&
            expenseAmount > 0 &&
            inputCategory.trim() !== ''
        );
    };

    return (
        <Container isBudget={true}>
            <MenuContainer isBudget={true}>
                <div style={{ marginBottom: '-2rem' }}>
                    <Heading level={2}>Manage Expenses</Heading>
                </div>
                <Subtitle level={3}>Name</Subtitle>
                <GuidedInput
                    value={inputExpenseName}
                    setInputValue={(name) => setInputExpenseName(name)}
                    suggestions={expenseNames.map(name => name.charAt(0).toUpperCase() + name.slice(1))}
                    placeholder="Name of the expense"
                    onChange={(e) => setInputExpenseName(e.target.value)}
                />

                <Subtitle level={3}>Price</Subtitle>
                <Input
                    value={inputExpensePrice}
                    placeholder="Price of the expense"
                    type='number'
                    onChange={(e) => {
                        const value = e.target.value;
                        setInputExpensePrice(
                            value.split('').filter(c => c >= '0' && c <= '9').join('')
                        );
                    }}
                />


                <Subtitle level={3}>Category</Subtitle>
                <GuidedInput
                    value={inputCategory}
                    suggestions={categories.map(cat => cat.charAt(0).toUpperCase() + cat.slice(1))}
                    placeholder="Name of category"
                    setInputValue={(name) => setInputCategory(name)}
                    onChange={(e) => setInputCategory(e.target.value)}
                />
                <Subtitle level={3}>Description</Subtitle>
                <Input
                    value={inputExpenseDescription}
                    placeholder="Description of the expense"
                    onChange={(e) => setInputExpenseDescription(e.target.value)}
                />

                {notification && <Notification>{notification}</Notification>}

                <ButtonContainer>
                    {existingExpense ? (
                        <>
                            <Button onClick={handleAddExpense}>Modify Expense</Button>
                            <Button onClick={handleRemoveExpense}>Remove Expense</Button>
                        </>
                    ) : isInputValid() ? (
                        <Button onClick={handleAddExpense}>
                            {categories.includes(inputCategory.trim().toLowerCase()) ? 'Add Expense' : 'Add Expense and Category'}
                        </Button>
                    ) : (
                        <Button disabled>
                            {categories.includes(inputCategory.trim().toLowerCase()) ? 'Add Expense' : 'Add Expense and Category'}
                        </Button>
                    )}
                </ButtonContainer>
            </MenuContainer>

            <Budget expenses={expenses} />
        </Container>
    );
};

export default BudgetPage;
