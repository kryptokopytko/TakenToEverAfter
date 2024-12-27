import React, { useState } from "react";
import Button, { ButtonContainer } from "../components/ui/Button";
import { Subtitle } from "../styles/typography";
import { Container } from "../styles/form";
import { sendResponse } from "../API/DbApi/DBApi";
import Input from "../components/ui/Input";
import DropdownSelector from "../components/ui/Dropdown/Dropdown";
import Invitation from "../sections/Printables/Invitation";

interface GuestResponseProps { }

const GuestResponsePage: React.FC<GuestResponseProps> = ({ }) => {

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

    const dietaryOptions = [
        { label: "No preference", value: "no_preference" },
        { label: "Vegetarian", value: "vegetarian" },
        { label: "Vegan", value: "vegan" },
        { label: "Lactose-free", value: "lactose_free" },
        { label: "Gluten-free", value: "gluten_free" },
        { label: "Other (please specify)", value: "other" },
    ];

    return (
        <Container>
            <Invitation>
                <div style={{ textAlign: 'center' }}>
                    {response === null && (
                        <>
                            <Subtitle level={2}>Will you be joining us?</Subtitle>

                            <ButtonContainer>
                                <Button minWidth='10rem' onClick={() => handleResponse("yes")}>Yes</Button>
                                <Button minWidth='10rem' onClick={() => handleResponse("no")}>No</Button>
                            </ButtonContainer> </>)}

                    {response && response === "yes" && (
                        <div style={{ marginTop: '2rem', marginLeft: '2.5rem' }}>
                            <DropdownSelector
                                options={dietaryOptions}
                                title="Do you have any dietary preferences?"
                                onOptionSelect={(option) => setDietaryPreference(option as string)}
                            />
                            {dietaryPreference === "other" && (
                                <div style={{ marginTop: '1rem' }}>
                                    <Input
                                        size="medium"
                                        variant="tertiary"
                                        value={otherPreference}
                                        onChange={(e) => setOtherPreference(e.target.value)}
                                        placeholder="Please specify your preference"
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    {response && (
                        <div style={{ marginTop: '2rem' }}>
                            Thank you for your response, {guestName}!
                            <br />
                            You have selected:{" "}
                            {response === "yes" ? "Yes, I will attend!" : "No, I cannot attend."}
                        </div>
                    )}

                    {dietaryPreference && dietaryPreference !== "no_preference" && (
                        <div style={{ marginTop: '1rem' }}>
                            Your dietary preference:{" "}
                            {dietaryPreference === "other" ? otherPreference : dietaryPreference}
                        </div>
                    )}
                </div>
            </Invitation >

        </Container>
    );
};

export default GuestResponsePage;
