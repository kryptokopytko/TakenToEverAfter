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
import { translations } from "../translations";


interface BudgetPageProps { }

const BudgetPage: React.FC<BudgetPageProps> = () => {
    const [inputExpenseName, setInputExpenseName] = useState('');
    const [inputExpensePrice, setInputExpensePrice] = useState('');
    const [inputCategory, setInputCategory] = useState('');
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [existingExpense, setExistingExpense] = useState<Expense | null>(null);
    const [notification, setNotification] = useState<string | null>(null);
    const [inputExpenseDescription, setInputExpenseDescription] = useState('');
    const FunctionsProxy = useFunctionsProxy();

    const { expenseCards, language, setExpenseCards } = useUser();

    const expenseNames = expenseCards.flatMap(expenseCard =>
        expenseCard.expenses
    );

    const categories = expenseCards.map(expenseCard => expenseCard.category.toLowerCase());

    useEffect(() => {
        const normalizedExpenseName = inputExpenseName.trim().toLowerCase();
        const category = expenseCards.find(expenseCard => expenseCard.expenses.some(expense =>
             expense.name.trim().toLowerCase() == normalizedExpenseName
        ));
        
        if (category) {
            setCategoryId(category.id);
            const existingSubExpense = category.expenses.find(expense => expense.name.toLowerCase() === normalizedExpenseName);
            setExistingExpense(existingSubExpense!);
            setInputExpensePrice(existingSubExpense!.amount.toString());
            setInputCategory(category.category);
            setInputExpenseDescription(existingSubExpense!.description);
        } else {
            const normalizedCategory = inputCategory.trim().toLowerCase();
            const category = expenseCards.find(expenseCard => expenseCard.category == normalizedCategory);
        
            if (category && inputExpenseName != '') {
                setCategoryId(category.id);
            } else {
                setCategoryId(null);
            }

            if (inputExpenseName == '') {
                setInputCategory('');
            }

            setExistingExpense(null);
            setInputExpensePrice('');
            setInputExpenseDescription('');
        }
        
    }, [inputExpenseName, inputCategory, expenseCards]);

    const clear = () => {
        setInputExpenseName('');
        setInputExpensePrice('');
        setInputCategory('');
        setInputExpenseDescription('');
    }

    const handleUpdateExpense = async () => {
        const expenseAmount = Number(inputExpensePrice);
        const updatedExpense = {
            id: existingExpense!.id,
            name: inputExpenseName,
            amount: expenseAmount,
            description: inputExpenseDescription
        };

        if (!categoryId) {
            const id = await FunctionsProxy.addCategory(inputCategory);
            setCategoryId(id);
            FunctionsProxy.updateExpense(existingExpense!.id, id, inputExpenseName, expenseAmount, inputExpenseDescription);
            setExpenseCards([
                ...expenseCards.map(card => {
                    if (card.expenses.some(expense => expense.id === existingExpense?.id)) {
                        return {
                            ...card,
                            expenses: card.expenses.filter(expense => expense.id !== existingExpense?.id)
                        };
                    }
                    return card;
                }),
                {
                    category: inputCategory,
                    id: id,
                    expenses: [updatedExpense]
                }
            ]);
        } else {
            FunctionsProxy.updateExpense(existingExpense!.id, categoryId, inputExpenseName, expenseAmount, inputExpenseDescription);
            setExpenseCards(
                expenseCards.map(card => {
                    if (card.expenses.some(expense => expense.id === existingExpense?.id && card.id != categoryId)) {
                        return {
                            ...card,
                            expenses: card.expenses.filter(expense => expense.id !== existingExpense?.id)
                        };
                    }
                    if (card.id == categoryId) {
                        return {
                            ...card,
                            expenses: card.expenses.map(expense => expense.id == existingExpense?.id? updatedExpense : expense)
                        };
                    }
                    return card;
                })
            );
        }

        setNotification(
            translations[language].expenseUpdated.replace('{name}', inputExpenseName)
          );
        setTimeout(() => setNotification(null), notificationTimeOut);
        clear();
    }
    const handleAddExpense = async () => {
        const expenseAmount = Number(inputExpensePrice);

        if (!categoryId) {
            const newCategoryId = await FunctionsProxy.addExpenseCategory(inputCategory);
            setCategoryId(newCategoryId);
            const expenseId = await FunctionsProxy.addExpense(newCategoryId, inputExpenseName, expenseAmount, inputExpenseDescription);
            setExpenseCards([
                ...expenseCards,
                {
                    id: newCategoryId,
                    category: inputCategory,
                    expenses: [
                        {
                            id: expenseId,
                            name: inputExpenseName,
                            amount: expenseAmount,
                            description: inputExpenseDescription
                        }
                    ]
                }
            ]);
        } else {
            const expenseId = await FunctionsProxy.addExpense(categoryId, inputExpenseName, expenseAmount, inputExpenseDescription);
            setExpenseCards(
                expenseCards.map(card => {
                    if (card.id === categoryId) {
                        return {
                            ...card,
                            expenses: [
                                ...card.expenses,
                                {
                                    id: expenseId,
                                    name: inputExpenseName,
                                    amount: expenseAmount,
                                    description: inputExpenseDescription
                                }
                            ]
                        };
                    }
                    return card;
                })
            );
        }

        setNotification(
            translations[language].expenseAdded
              .replace('{name}', inputExpenseName)
              .replace('{category}', inputCategory)
          );          

        setTimeout(() => setNotification(null), notificationTimeOut);
        clear();
    };


    const handleRemoveExpense = () => {
        FunctionsProxy.removeExpense(existingExpense!.id);
        setExpenseCards(
            expenseCards.map(card => ({
                ...card,
                expenses: card.expenses.filter(expense => expense.id !== existingExpense!.id)
            }))
        );
        setNotification(
            translations[language].expenseRemoved
              .replace('{name}', inputExpenseName)
              .replace('{category}', inputCategory)
          );
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
                    <Heading level={2}>{translations[language].manageExpenses}</Heading>
                </div>
                <Subtitle level={3}>{translations[language].name}</Subtitle>
                <GuidedInput
                    value={inputExpenseName}
                    setInputValue={(name) => setInputExpenseName(name)}
                    suggestions={expenseNames.map(expense => expense.name.charAt(0).toUpperCase() + expense.name.slice(1))}
                    placeholder={translations[language].expenseNamePlaceholder}
                    onChange={(e) => setInputExpenseName(e.target.value)}
                />

                <Subtitle level={3}>Price</Subtitle>
                <Input
                    value={inputExpensePrice}
                    placeholder={translations[language].expensePricePlaceholder}
                    type='number'
                    onChange={(e) => {
                        const value = e.target.value;
                        setInputExpensePrice(
                            value.split('').filter(c => c >= '0' && c <= '9').join('')
                        );
                    }}
                />


                <Subtitle level={3}>{translations[language].category}</Subtitle>
                <GuidedInput
                    value={inputCategory}
                    suggestions={categories.map(cat => cat.charAt(0).toUpperCase() + cat.slice(1))}
                    placeholder={translations[language].categoryPlaceholder}
                    setInputValue={(name) => setInputCategory(name)}
                    onChange={(e) => setInputCategory(e.target.value)}
                />
                <Subtitle level={3}>{translations[language].description}</Subtitle>
                <Input
                    value={inputExpenseDescription}
                    placeholder={translations[language].expenseDescriptionPlaceholder}
                    onChange={(e) => setInputExpenseDescription(e.target.value)}
                />

                {notification && <Notification>{notification}</Notification>}

                <ButtonContainer>
                    {existingExpense ? (
                        <>
                            <Button onClick={handleUpdateExpense}>{translations[language].modifyExpense}</Button>
                            <Button onClick={handleRemoveExpense}>{translations[language].removeExpense}</Button>
                        </>
                    ) : isInputValid() ? (
                        <Button onClick={handleAddExpense}>
                            {categories.includes(inputCategory.trim().toLowerCase()) ? translations[language].addExpense : translations[language].addExpenseAndCategory}
                        </Button>
                    ) : (
                        <Button disabled>
                            {categories.includes(inputCategory.trim().toLowerCase()) ? translations[language].addExpense : translations[language].addExpenseAndCategory}
                        </Button>
                    )}
                </ButtonContainer>
            </MenuContainer>

            <Budget />
        </Container>
    );
};

export default BudgetPage;
