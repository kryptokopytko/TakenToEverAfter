import React, { useState } from "react";
import Button, { ButtonContainer } from "../components/ui/Button";
import { Body, Heading, Subtitle } from "../styles/typography";
import { Container, Form } from "../styles/form";
import { sendResponse } from "../dummyDBApi";
import { useUser } from "../providers/UserContext";
import Input from "../components/ui/Input";
import DropdownSelector from "../components/ui/Dropdown/Dropdown";

interface GuestResponseProps { }

const GuestResponsePage: React.FC<GuestResponseProps> = ({ }) => {
    const { names, weddingDate } = useUser();

    const guestName = new URLSearchParams(location.search).get('guest');
    const [response, setResponse] = useState<"yes" | "no" | null>(null);
    const [dietaryPreference, setDietaryPreference] = useState<string | null>(null);
    const [otherPreference, setOtherPreference] = useState<string>("");

    const [bride, groom] = names;

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
            <Form>
                <div style={{ textAlign: 'center' }}>
                    <Heading level={2}>Welcome {guestName}!</Heading>
                    <Body size='big'>We are excited to invite you to our wedding!</Body>
                    <Subtitle level={3}>{bride} & {groom}</Subtitle>
                    <Body size='big'>Date: {weddingDate}</Body>
                    {response === null && (
                        <>
                            <Subtitle level={2}>Will you be joining us?</Subtitle>

                            <ButtonContainer>
                                <Button minWidth='10rem' onClick={() => handleResponse("yes")}>Yes</Button>
                                <Button minWidth='10rem' onClick={() => handleResponse("no")}>No</Button>
                            </ButtonContainer> </>)}

                    {response && response === "yes" && (
                        <div style={{ marginTop: '2rem' }}>
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
                            Thank you for your response, {guestName}! You have selected:{" "}
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
            </Form>
        </Container>
    );
};

export default GuestResponsePage;
