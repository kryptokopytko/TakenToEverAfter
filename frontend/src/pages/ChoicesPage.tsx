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
    const [existingChoice, setExistingChoice] = useState<any | null>(null);
    const [notification, setNotification] = useState<string | null>(null);
    const [choiceDescription, setChoiceDescription] = useState('');
    const FunctionsProxy = useFunctionsProxy();
    const { choices, language } = useUser();

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
            setNotification(translations[language].choiceAlreadyExists.replace("{name}", choiceName).replace("{category}", choiceCategory));
            setTimeout(() => setNotification(null), notificationTimeOut);
            return;
        }

        if (categoryIndex === -1) {
            FunctionsProxy.addChoice(choiceCategory, { name: choiceName, amount: parsedAmount, description: choiceDescription});
        } else {
            FunctionsProxy.updateChoice(choiceCategory, choiceName, { amount: parsedAmount, description: choiceDescription});
        }

        FunctionsProxy.addChoice(choiceCategory, { name: choiceName, amount: parsedAmount, description: choiceDescription });
        setNotification(translations[language].choiceAdded.replace("{name}", choiceName).replace("{category}", choiceCategory));
        setTimeout(() => setNotification(null), notificationTimeOut);

        
        setChoiceName('');
        setChoiceAmount('');
        setChoiceCategory('');
        setChoiceDescription('');
    };


    const handleRemoveChoice = () => {
        FunctionsProxy.removeChoice(choiceCategory, choiceName);
        setNotification(translations[language].choiceRemoved.replace("{name}", choiceName).replace("{category}", choiceCategory));
        setTimeout(() => setNotification(null), notificationTimeOut);
    };

    const handleUpdateChoice = () => {
        const parsedAmount = parseFloat(choiceAmount);
        FunctionsProxy.updateChoice(choiceCategory, choiceName, { amount: parsedAmount, description: choiceDescription });
        setNotification(translations[language].choiceUpdated.replace("{name}", choiceName).replace("{category}", choiceCategory));
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

            <Choices/>
        </Container>
    );
};

export default ChoicesPage;
