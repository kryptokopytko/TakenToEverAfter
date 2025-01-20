import React, { useState } from "react";
import Button, { ButtonContainer } from "../components/ui/Button";
import { Subtitle } from "../styles/typography";
import { Container } from "../styles/form";
import { sendResponse } from "../API/DbApi/DBApi";
import Input from "../components/ui/Input";
import DropdownSelector from "../components/ui/Dropdown/Dropdown";
import Invitation from "../sections/Printables/Invitation";
import { translations } from "../translations";
import { useUser } from "../providers/UserContext";

interface GuestResponseProps { }

const GuestResponsePage: React.FC<GuestResponseProps> = ({ }) => {
    const { language } = useUser();
    const guestName = new URLSearchParams(location.search).get('guest');
    const [response, setResponse] = useState<"yes" | "no" | null>(null);
    const [dietaryPreference, setDietaryPreference] = useState<string | null>(null);
    const [otherPreference, setOtherPreference] = useState<string>("");


    const handleResponse = (decision: "yes" | "no") => {
        setResponse(decision);

        if (guestName && response) {
            sendResponse(guestName, response);
        }
    };

    const isEng = language == 'english';
    const dietaryOptions = [
        { label: isEng ? "No preference" : "Brak preferencji", value: "no_preference" },
        { label: isEng ? "Vegetarian" : "Wegetariańska", value: "vegetarian" },
        { label: isEng ? "Vegan" : "Wegańska", value: "vegan" },
        { label: isEng ? "Lactose-free" : "Bez laktozy", value: "lactose_free" },
        { label: isEng ? "Gluten-free" : "Bezglutenowa", value: "gluten_free" },
        { label: isEng ? "Other (please specify)" : "Inna (proszę określić)", value: "other" },
    ];    

    return (
        <Container>
            <Invitation>
                <div style={{ textAlign: 'center' }}>
                    {response === null && (
                        <>
                            <Subtitle level={2}>{translations[language].question}</Subtitle>

                            <ButtonContainer>
                                <Button minWidth='10rem' onClick={() => handleResponse("yes")}>{translations[language].yes}</Button>
                                <Button minWidth='10rem' onClick={() => handleResponse("no")}>{translations[language].no}</Button>
                            </ButtonContainer> </>)}

                    {response && response === "yes" && (
                        <div style={{ marginTop: '2rem', marginLeft: '2.5rem' }}>
                            <DropdownSelector
                                options={dietaryOptions}
                                title={translations[language].dietaryPreferencesQuestion}
                                onOptionSelect={(option) => setDietaryPreference(option as string)}
                            />
                            {dietaryPreference === "other" && (
                                <div style={{ marginTop: '1rem' }}>
                                    <Input
                                        size="medium"
                                        variant="tertiary"
                                        value={otherPreference}
                                        onChange={(e) => setOtherPreference(e.target.value)}
                                        placeholder={translations[language].otherPreferencePlaceholder}
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    {response && (
                        <div style={{ marginTop: '2rem' }}>
                            {translations[language].thankYou}, {guestName}!
                            <br />
                            {translations[language].yourSelection}:{" "}
                            {response === "yes" ? translations[language].confirm : translations[language].refuse}
                        </div>
                    )}

                    {dietaryPreference && dietaryPreference !== "no_preference" && (
                        <div style={{ marginTop: '1rem' }}>
                            {translations[language].dietaryPreference}:{" "}
                            {dietaryPreference === "other" ? otherPreference : dietaryPreference}
                        </div>
                    )}
                </div>
            </Invitation >

        </Container>
    );
};

export default GuestResponsePage;
