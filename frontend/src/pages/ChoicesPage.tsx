import { Heading, Subtitle } from "../styles/typography";
import Choices from "../sections/Choices";
import { Container, MenuContainer, Notification, notificationTimeOut } from "../styles/page";
import Input from "../components/ui/Input";
import GuidedInput from "../components/ui/GuidedInput";
import Button, { ButtonContainer } from "../components/ui/Button";
import { useEffect, useState } from "react";
import useFunctionsProxy from "../API/FunctionHandler";
import { useUser } from "../providers/UserContext";
import { translations } from "../translations";

interface ChoicesPageProps { }

const ChoicesPage: React.FC<ChoicesPageProps> = () => {
    const [choiceName, setChoiceName] = useState('');
    const [choiceAmount, setChoiceAmount] = useState('');
    const [choiceCategory, setChoiceCategory] = useState('');
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [existingChoice, setExistingChoice] = useState<any | null>(null);
    const [notification, setNotification] = useState<string | null>(null);
    const [choiceDescription, setChoiceDescription] = useState('');
    const [pros, setPros] = useState('');
    const [cons, setCons] = useState('');
    const FunctionsProxy = useFunctionsProxy();
    const { choices, setChoices, language } = useUser();

    useEffect(() => {
        const normalizedExpenseName = choiceName.trim().toLowerCase();
        const category = choices.find(choiceCard => choiceCard.options.some(option =>
            option.name.trim().toLowerCase() == normalizedExpenseName
        ));

        if (category) {
            setCategoryId(category.id);
            const choice = category.options.find(option => option.name.toLowerCase() === normalizedExpenseName);
            setExistingChoice(choice);
            setChoiceAmount(choice!.amount.toString());
            setChoiceCategory(category.category);
            setChoiceDescription(choice!.description);
            setPros(choice!.pros || '');
            setCons(choice!.cons || '');
        } else {
            const normalizedCategory = choiceCategory.trim().toLowerCase();
            const category = choices.find(expenseCard => expenseCard.category == normalizedCategory);

            if (category && choiceName != '') {
                setCategoryId(category.id);
            } else {
                setCategoryId(null);
            }

            if (choiceName == '') {
                setChoiceCategory('');
                setExistingChoice(null);
                setChoiceAmount('');
                setChoiceDescription('');
                setPros('');
                setCons('');
            }
        }

    }, [choiceName, choiceCategory, choices]);

    const clear = () => {
        setChoiceName('');
        setChoiceAmount('');
        setChoiceCategory('');
        setChoiceDescription('');
        setPros('');
        setCons('');
    };

    const handleAddChoice = async () => {
        const choiceAmountValue = Number(choiceAmount);

        if (!categoryId) {
            const newCategoryId = await FunctionsProxy.addChoiceCategory(choiceCategory);
            setCategoryId(newCategoryId);
            const choiceId = await FunctionsProxy.addChoice(
                newCategoryId,
                choiceName,
                choiceAmountValue,
                choiceDescription,
                pros,
                cons
            );

            setChoices([
                ...choices,
                {
                    id: newCategoryId,
                    category: choiceCategory,
                    options: [
                        {
                            id: choiceId,
                            name: choiceName,
                            amount: choiceAmountValue,
                            description: choiceDescription,
                            pros,
                            cons
                        }
                    ]
                }
            ]);
        } else {
            const choiceId = await FunctionsProxy.addChoice(
                categoryId,
                choiceName,
                choiceAmountValue,
                choiceDescription,
                pros,
                cons
            );

            setChoices(
                choices.map(card => {
                    if (card.id === categoryId) {
                        return {
                            ...card,
                            options: [
                                ...card.options,
                                {
                                    id: choiceId,
                                    name: choiceName,
                                    amount: choiceAmountValue,
                                    description: choiceDescription,
                                    pros,
                                    cons
                                }
                            ]
                        };
                    }
                    return card;
                })
            );
        }

        setNotification(
            translations[language].choiceAdded
                .replace('{name}', choiceName)
                .replace('{category}', choiceCategory)
        );

        setTimeout(() => setNotification(null), notificationTimeOut);
        clear();
    };



    const handleRemoveChoice = () => {
        FunctionsProxy.removeChoice(existingChoice.id);
        setChoices(
            choices.map(card => ({
                ...card,
                options: card.options.filter(option => option.id !== existingChoice!.id)
            }))
        );
        setNotification(translations[language].choiceRemoved.replace("{name}", choiceName).replace("{category}", choiceCategory));
        setTimeout(() => setNotification(null), notificationTimeOut);
    };

    const handleUpdateChoice = async () => {
        const parsedAmount = parseFloat(choiceAmount);

        const updatedChoice = {
            id: existingChoice!.id,
            name: choiceName,
            amount: parsedAmount,
            description: choiceDescription,
            pros: pros,
            cons: cons
        };

        if (!categoryId) {
            const newCategoryId = await FunctionsProxy.addChoiceCategory(choiceCategory);
            setCategoryId(newCategoryId);

            await FunctionsProxy.updateChoice(
                existingChoice!.id,
                newCategoryId,
                choiceName,
                parsedAmount,
                choiceDescription,
                pros,
                cons
            );

            setChoices([
                ...choices.map(card => {
                    if (card.options.some(option => option.id === existingChoice?.id)) {
                        return {
                            ...card,
                            options: card.options.filter(option => option.id !== existingChoice?.id)
                        };
                    }
                    return card;
                }),
                {
                    id: newCategoryId,
                    category: choiceCategory,
                    options: [updatedChoice]
                }
            ]);
        } else {
            await FunctionsProxy.updateChoice(
                existingChoice!.id,
                categoryId,
                choiceName,
                parsedAmount,
                choiceDescription,
                pros,
                cons
            );

            setChoices(
                choices.map(card => {
                    if (card.options.some(option => option.id === existingChoice?.id && card.id !== categoryId)) {
                        return {
                            ...card,
                            options: card.options.filter(option => option.id !== existingChoice?.id)
                        };
                    }
                    if (card.id === categoryId) {
                        return {
                            ...card,
                            options: card.options.map(option =>
                                option.id === existingChoice?.id ? updatedChoice : option
                            )
                        };
                    }
                    return card;
                })
            );
        }

        setNotification(
            translations[language].choiceUpdated
                .replace("{name}", choiceName)
                .replace("{category}", choiceCategory)
        );

        setTimeout(() => setNotification(null), notificationTimeOut);
        clear();
    };




    const isInputValid = () => {
        return (
            choiceName.trim() !== '' &&
            choiceAmount.trim() !== '' &&
            !isNaN(parseFloat(choiceAmount)) &&
            choiceCategory.trim() !== ''
        );
    };


    return (
        <Container>
            <MenuContainer>
                <Heading level={2}>{translations[language].manageChoices}</Heading>

                <Subtitle level={3}>{translations[language].choiceName}</Subtitle>
                <GuidedInput
                    value={choiceName}
                    setInputValue={setChoiceName}
                    suggestions={choices.flatMap(choice => choice.options.map(option => option.name))}
                    placeholder={translations[language].choiceName}
                    onChange={(e) => {
                        setChoiceName(e.target.value);
                        setExistingChoice(null);
                    }}
                />

                <Subtitle level={3}>{translations[language].amount}</Subtitle>
                <Input
                    value={choiceAmount}
                    placeholder={translations[language].price}
                    type="number"
                    onChange={(e) => setChoiceAmount(e.target.value)}
                />

                <Subtitle level={3}>{translations[language].category}</Subtitle>
                <GuidedInput
                    value={choiceCategory}
                    suggestions={choices.map(choice => choice.category)}
                    placeholder={translations[language].category}
                    setInputValue={setChoiceCategory}
                    onChange={(e) => setChoiceCategory(e.target.value)}
                />

                <Subtitle level={3}>{translations[language].description}</Subtitle>
                <Input
                    value={choiceDescription}
                    placeholder={translations[language].description}
                    onChange={(e) => setChoiceDescription(e.target.value)}
                />
                <Subtitle level={3}>{translations[language].pros}</Subtitle>
                <Input
                    value={pros}
                    placeholder={translations[language].pros}
                    onChange={(e) => setPros(e.target.value)}
                />
                {translations[language].prosText}

                <Subtitle level={3}>{translations[language].cons}</Subtitle>
                <Input
                    value={cons}
                    placeholder={translations[language].cons}
                    onChange={(e) => setCons(e.target.value)}
                />
                {translations[language].consText}

                {notification && <Notification>{notification}</Notification>}

                <ButtonContainer>
                    {existingChoice ? (
                        <>
                            <Button onClick={handleUpdateChoice}>{translations[language].modifyChoice}</Button>
                            <Button onClick={handleRemoveChoice}>{translations[language].delete}</Button>
                        </>
                    ) : isInputValid() ? (
                        <Button onClick={handleAddChoice}>{translations[language].add}</Button>
                    ) : (
                        <Button disabled>{translations[language].add}</Button>
                    )}
                </ButtonContainer>
            </MenuContainer>

            <Choices />
        </Container>
    );
};

export default ChoicesPage;
