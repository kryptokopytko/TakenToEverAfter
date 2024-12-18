import { Heading, Subtitle } from "../styles/typography";
import Choices from "../sections/Choices";
import { Container, MenuContainer, Notification, notificationTimeOut } from "../styles/page";
import Input from "../components/ui/Input";
import GuidedInput from "../components/ui/GuidedInput";
import Button, { ButtonContainer } from "../components/ui/Button";
import { useEffect, useState } from "react";
import useFunctionsProxy from "../FunctionHandler";
import { useUser } from "../providers/UserContext";

interface ChoicesPageProps { }

const ChoicesPage: React.FC<ChoicesPageProps> = () => {
    const [choiceName, setChoiceName] = useState('');
    const [choiceAmount, setChoiceAmount] = useState('');
    const [choiceCategory, setChoiceCategory] = useState('');
    const [existingChoice, setExistingChoice] = useState<any | null>(null);
    const [notification, setNotification] = useState<string | null>(null);
    const [choiceDescription, setChoiceDescription] = useState('');
    const FunctionsProxy = useFunctionsProxy();
    const {choices} = useUser();

    useEffect(() => {
        const normalizedChoiceName = choiceName.trim().toLowerCase();
        const normalizedCategory = choiceCategory.trim().toLowerCase();

        const foundChoice = choices.find(choice =>
            choice.category.toLowerCase() === normalizedCategory &&
            choice.options.some(option => option.name.toLowerCase() === normalizedChoiceName)
        );

        if (foundChoice) {
            setExistingChoice(foundChoice);
            setChoiceAmount(foundChoice.options.find(option => option.name.toLowerCase() === normalizedChoiceName)?.amount.toString() || '');
        } else {
            setExistingChoice(null);
        }
    }, [choiceName, choiceCategory, choices]);

    const handleAddChoice = () => {
        const parsedAmount = parseFloat(choiceAmount);

        const categoryIndex = choices.findIndex(choice => choice.category.toLowerCase() === choiceCategory.toLowerCase());
        const choiceExists = categoryIndex !== -1 && choices[categoryIndex].options.some(option => option.name.toLowerCase() === choiceName.toLowerCase());

        if (choiceExists) {
            setNotification(`Choice "${choiceName}" already exists in category "${choiceCategory}"`);
            setTimeout(() => setNotification(null), notificationTimeOut);
            return;
        }

        if (categoryIndex === -1) {
            FunctionsProxy.addChoice(choiceCategory, { name: choiceName, amount: parsedAmount, description: choiceDescription});
        } else {
            FunctionsProxy.updateChoice(choiceCategory, choiceName, { amount: parsedAmount, description: choiceDescription});
        }

        FunctionsProxy.addChoice(choiceCategory, { name: choiceName, amount: parsedAmount, description: choiceDescription });
        setNotification(`Choice "${choiceName}" added to category "${choiceCategory}"`);
        setTimeout(() => setNotification(null), notificationTimeOut);

        
        setChoiceName('');
        setChoiceAmount('');
        setChoiceCategory('');
        setChoiceDescription('');
    };


    const handleRemoveChoice = () => {
        FunctionsProxy.removeChoice(choiceCategory, choiceName);
        setNotification(`Choice "${choiceName}" removed from category "${choiceCategory}"`);
        setTimeout(() => setNotification(null), notificationTimeOut);
    };

    const handleUpdateChoice = () => {
        const parsedAmount = parseFloat(choiceAmount);
        FunctionsProxy.updateChoice(choiceCategory, choiceName, { amount: parsedAmount, description: choiceDescription });
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
                    suggestions={choices.flatMap(choice => choice.options.map(option => option.name))}
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
                    suggestions={choices.map(choice => choice.category)}
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

            <Choices/>
        </Container>
    );
};

export default ChoicesPage;
