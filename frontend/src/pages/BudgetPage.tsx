import { Heading, Subtitle } from "../styles/typography";
import Budget from "../sections/Budget/Budget";
import { Container, MenuContainer, Notification, notificationTimeOut } from "../styles/page";
import Input from "../components/ui/Input";
import { useState, useEffect } from "react";
import GuidedInput from "../components/ui/GuidedInput";
import Button, { ButtonContainer } from "../components/ui/Button";
import { Expense } from "../types";
import { useUser } from "../providers/UserContext";
import useFunctionsProxy from "../API/FunctionHandler";

interface BudgetPageProps { }

const BudgetPage: React.FC<BudgetPageProps> = () => {
    const [inputExpenseName, setInputExpenseName] = useState('');
    const [inputExpensePrice, setInputExpensePrice] = useState('');
    const [inputCategory, setInputCategory] = useState('');
    const [existingExpense, setExistingExpense] = useState<Expense | null>(null);
    const [notification, setNotification] = useState<string | null>(null);
    const [inputExpenseDescription, setInputExpenseDescription] = useState('');
    const FunctionsProxy = useFunctionsProxy();

    const { expenseCards } = useUser();

    const expenseNames = expenseCards.flatMap(expenseCard =>
        expenseCard.expenses.map(expense => expense.name.toLowerCase())
    );

    const categories = expenseCards.map(expenseCard => expenseCard.category.toLowerCase());

    useEffect(() => {
        const normalizedCategory = inputCategory.trim().toLowerCase();
        const normalizedExpenseName = inputExpenseName.trim().toLowerCase();
        const category = expenseCards.find(expenseCard => expenseCard.category.toLowerCase() === normalizedCategory);

        if (category) {
            const existingSubExpense = category.expenses.find(expense => expense.name.toLowerCase() === normalizedExpenseName);
            if (existingSubExpense) {
                setExistingExpense(existingSubExpense);
                setInputExpensePrice(existingSubExpense.amount.toString());
            } else {
                setExistingExpense(null);
            }
        } else {
            setExistingExpense(null);
        }
    }, [inputExpenseName, inputCategory, expenseCards]);

    const clear = () => {
        setInputExpenseName('');
        setInputExpensePrice('');
        setInputCategory('');
        setInputExpenseDescription('');
    }

    const handleUpdateExpense = () => {
        const expenseAmount = Number(inputExpensePrice);
        FunctionsProxy.updateExpense(existingExpense!.id, inputCategory, inputExpenseName, expenseAmount, inputExpenseDescription);
        
        setNotification(`Expense "${inputExpenseName}" updated"`);
        setTimeout(() => setNotification(null), notificationTimeOut);
        clear();
    }
    const handleAddExpense = () => {
        const expenseAmount = Number(inputExpensePrice);
        const normalizedCategory = inputCategory.toLowerCase();
        const normalizedExpenseName = inputExpenseName.toLowerCase();
        const categoryExists = categories.includes(normalizedCategory);

        if (categoryExists) {
            FunctionsProxy.updateExpense(inputCategory, inputExpenseName, expenseAmount, inputExpenseDescription);
            setNotification(`Expense "${inputExpenseName}" updated in category "${inputCategory}"`);
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
            FunctionsProxy.addExpense(inputCategory, inputExpenseName, expenseAmount, inputExpenseDescription);
        }
        setTimeout(() => setNotification(null), notificationTimeOut);
        clear();
    };


    const handleRemoveExpense = () => {
        FunctionsProxy.removeExpense(existingExpense!.id);
        setNotification(`Expense "${inputExpenseName}" removed from category "${inputCategory}"`);
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
                            <Button onClick={handleUpdateExpense}>Modify Expense</Button>
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

            <Budget />
        </Container>
    );
};

export default BudgetPage;
