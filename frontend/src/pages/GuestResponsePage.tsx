import React, { useState } from "react";
import Button, { ButtonContainer } from "../components/ui/Button";
import { Body, Heading, Subtitle } from "../styles/typography";
import { Container, Form } from "../styles/form";
import { sendResponse } from "../dummyDBApi";
import { useUser } from "../providers/UserContext";

interface GuestResponseProps {

}

const GuestResponsePage: React.FC<GuestResponseProps> = ({ }) => {
    const { names, weddingDate } = useUser();

    const guestName = new URLSearchParams(location.search).get('guest');
    const [response, setResponse] = useState<"yes" | "no" | null>(null);
    const [bride, groom] = names;
    const handleResponse = (decision: "yes" | "no") => {
        setResponse(decision);

        if (guestName && response) {
            sendResponse(guestName, response);
        }
    };

    return (
        <Container>
            <Form>
                <div style={{ textAlign: 'center' }}>
                    <Heading level={2}>Welcome {guestName}!</Heading>
                    <Body size='big'>We are excited to invite you to our wedding!</Body>
                    <Subtitle level={3}>{bride} & {groom}</Subtitle>
                    <Body size='big'>Date: {weddingDate}</Body>
                    <Subtitle level={2}>Will you be joining us?</Subtitle>

                    <ButtonContainer>
                        <Button minWidth='10rem' onClick={() => handleResponse("yes")}>Yes</Button>
                        <Button minWidth='10rem' onClick={() => handleResponse("no")}>No</Button>
                    </ButtonContainer>

                    {response && (
                        <div style={{ marginTop: '2rem' }}>
                            Thank you for your response, {guestName}! You have selected:{" "}
                            {response === "yes" ? "Yes, I will attend!" : "No, I cannot attend."}
                        </div>
                    )}
                </div>
            </Form>
        </Container>
    );
};

export default GuestResponsePage;
