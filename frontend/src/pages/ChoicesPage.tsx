import { Heading, Subtitle } from "../styles/typography";
import Choices from "../sections/Choices";
import { Container, MenuContainer, Notification, notificationTimeOut } from "../styles/page";
import Input from "../components/ui/Input";
import GuidedInput from "../components/ui/GuidedInput";
import Button, { ButtonContainer } from "../components/ui/Button";
import { useEffect, useState } from "react";
import Example from "../exampleData";
import { addChoice, removeChoice, updateChoice } from "../DBApi";

interface ChoicesPageProps { }

const ChoicesPage: React.FC<ChoicesPageProps> = () => {
    const [choiceName, setChoiceName] = useState('');
    const [choiceAmount, setChoiceAmount] = useState('');
    const [choiceCategory, setChoiceCategory] = useState('');
    const [choices, setChoices] = useState(Example.choices);
    const [existingChoice, setExistingChoice] = useState<any | null>(null);
    const [notification, setNotification] = useState<string | null>(null);
    const [choiceDescription, setChoiceDescription] = useState('');

    useEffect(() => {
        const normalizedChoiceName = choiceName.trim().toLowerCase();
        const normalizedCategory = choiceCategory.trim().toLowerCase();

        const foundChoice = choices.find(choice =>
            choice.choice.toLowerCase() === normalizedCategory &&
            choice.options.some(option => option.option.toLowerCase() === normalizedChoiceName)
        );

        if (foundChoice) {
            setExistingChoice(foundChoice);
            setChoiceAmount(foundChoice.options.find(option => option.option.toLowerCase() === normalizedChoiceName)?.amount.toString() || '');
        } else {
            setExistingChoice(null);
        }
    }, [choiceName, choiceCategory, choices]);

    const handleAddChoice = () => {
        const parsedAmount = parseFloat(choiceAmount);

        const categoryIndex = choices.findIndex(choice => choice.choice.toLowerCase() === choiceCategory.toLowerCase());
        const choiceExists = categoryIndex !== -1 && choices[categoryIndex].options.some(option => option.option.toLowerCase() === choiceName.toLowerCase());

        if (choiceExists) {
            setNotification(`Choice "${choiceName}" already exists in category "${choiceCategory}"`);
            setTimeout(() => setNotification(null), notificationTimeOut);
            return;
        }

        if (categoryIndex === -1) {
            setChoices(prevChoices => [
                ...prevChoices,
                {
                    choice: choiceCategory,
                    options: [{ option: choiceName, amount: parsedAmount, description: choiceDescription, isPicked: false }]
                }
            ]);
        } else {
            setChoices(prevChoices =>
                prevChoices.map((choice, index) => {
                    if (index === categoryIndex) {
                        return {
                            ...choice,
                            options: [
                                ...choice.options,
                                { option: choiceName, amount: parsedAmount, description: choiceDescription, isPicked: false }
                            ]
                        };
                    }
                    return choice;
                })
            );
        }

        addChoice(choiceCategory, { name: choiceName, amount: parsedAmount, description: choiceDescription });
        setNotification(`Choice "${choiceName}" added to category "${choiceCategory}"`);
        setTimeout(() => setNotification(null), notificationTimeOut);

        
        setChoiceName('');
        setChoiceAmount('');
        setChoiceCategory('');
        setChoiceDescription('');
    };


    const handleRemoveChoice = () => {
        setChoices(prevChoices =>
            prevChoices.map(choice => {
                if (choice.choice.toLowerCase() === choiceCategory.toLowerCase()) {
                    const updatedOptions = choice.options.filter(option => option.option.toLowerCase() !== choiceName.toLowerCase());
                    return {
                        ...choice,
                        options: updatedOptions
                    };
                }
                return choice;
            }).filter(choice => choice.options.length > 0)
        );

        removeChoice(choiceCategory, choiceName);
        setNotification(`Choice "${choiceName}" removed from category "${choiceCategory}"`);
        setTimeout(() => setNotification(null), notificationTimeOut);
    };

    const handleUpdateChoice = () => {
        const parsedAmount = parseFloat(choiceAmount);

        setChoices(prevChoices =>
            prevChoices.map(choice => {
                if (choice.choice.toLowerCase() === choiceCategory.toLowerCase()) {
                    return {
                        ...choice,
                        options: choice.options.map(option =>
                            option.option.toLowerCase() === choiceName.toLowerCase()
                                ? { ...option, amount: parsedAmount, description: choiceDescription }
                                : option
                        )
                    };
                }
                return choice;
            })
        );

        updateChoice(choiceCategory, choiceName, { amount: parsedAmount, description: choiceDescription });
        setNotification(`Choice "${choiceName}" updated in category "${choiceCategory}"`);
        setTimeout(() => setNotification(null), notificationTimeOut);
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
                <Heading level={2}>Manage Choices</Heading>

                <Subtitle level={3}>Choice Name</Subtitle>
                <GuidedInput
                    value={choiceName}
                    setInputValue={setChoiceName}
                    suggestions={choices.flatMap(choice => choice.options.map(option => option.option))}
                    placeholder="Name of the choice"
                    onChange={(e) => {
                        setChoiceName(e.target.value);
                        setExistingChoice(null);
                    }}
                />

                <Subtitle level={3}>Amount</Subtitle>
                <Input
                    value={choiceAmount}
                    placeholder="Price for the choice"
                    type="number"
                    onChange={(e) => setChoiceAmount(e.target.value)}
                />

                <Subtitle level={3}>Category</Subtitle>
                <GuidedInput
                    value={choiceCategory}
                    suggestions={choices.map(choice => choice.choice)}
                    placeholder="Category"
                    setInputValue={setChoiceCategory}
                    onChange={(e) => setChoiceCategory(e.target.value)}
                />
                <Subtitle level={3}>Description</Subtitle>
                <Input
                    value={choiceDescription}
                    placeholder="Description of the choice"
                    onChange={(e) => setChoiceDescription(e.target.value)}
                />


                {notification && <Notification>{notification}</Notification>}

                <ButtonContainer>
                    {existingChoice ? (
                        <>
                            <Button onClick={handleUpdateChoice}>Modify Choice</Button>
                            <Button onClick={handleRemoveChoice}>Remove Choice</Button>
                        </>
                    ) : isInputValid() ? (
                        <Button onClick={handleAddChoice}>Add Choice</Button>
                    ) : (
                        <Button disabled>Add Choice</Button>
                    )}
                </ButtonContainer>
            </MenuContainer>

            <Choices
                initialChoices={choices}
            />
        </Container>
    );
};

export default ChoicesPage;
