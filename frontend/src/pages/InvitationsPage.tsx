import React, { useState } from "react";
import styled from "styled-components";
import { Heading, Subtitle } from "../styles/typography";
import { Container, MenuContainer } from "../styles/page";
import Invitation from "../sections/Printables/Invitation";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { exportToPDF } from "../sections/Printables/exportToPdf";
import Example from "../exampleData";
import Checkbox from "../components/ui/Checkbox";
interface PrintablesPageProps {

}

const InputWrapper = styled.div`
  margin-bottom: 1rem;
`;

const Invites = styled.div`
    display: flex;
    flex-direction: column;
`;



const PrintablesPage: React.FC<PrintablesPageProps> = ({
}) => {
    const [mainText, setMainText] = useState("Request the pleasure of your company at the celebration of their marriage");
    const [additionalText, setAdditionalText] = useState("Come 15 minutes before the start of the ceremony");
    const [guestText, setGuestText] = useState("It would be our honor to celebrate this day with:");
    const [showAllInvites, setShowAllInvites] = useState(false);
    const [deliveredInvites, setDeliveredInvites] = useState<number[]>([]);

    const handleExportPDF = () => {
        const inviteIds = Example.listOfListsOfGuests.map((_, index) => `invite-${index}`);
        exportToPDF(inviteIds);
    };

    return (

        <Container>
            <MenuContainer>
                <Heading level={2}>Customize Invitation Text</Heading>
                <Subtitle level={3}>Additional Text</Subtitle>

                <InputWrapper>
                    <Input
                        size="long"
                        value={additionalText}
                        onChange={(e) => setAdditionalText(e.target.value)}
                        placeholder="Additional Text"
                    />
                </InputWrapper>

                <Subtitle level={3}>Guest Text</Subtitle>
                <InputWrapper>
                    <Input
                        size="long"
                        value={guestText}
                        onChange={(e) => setGuestText(e.target.value)}
                        placeholder="Guest Invitation Text"
                    />
                </InputWrapper>

                <Subtitle level={3}>Main Text</Subtitle>
                <InputWrapper>
                    <Input
                        size="long"
                        value={mainText}
                        onChange={(e) => setMainText(e.target.value)}
                        placeholder="Main Invitation Text"
                    />
                </InputWrapper>

                <Button onClick={() => setShowAllInvites(!showAllInvites)}>
                    {showAllInvites ? "Show Single Invite" : "Show All Invites"}
                </Button>
                {showAllInvites ?
                    <Button onClick={handleExportPDF}>Export to PDF</Button> : <></>}
            </MenuContainer>
            {showAllInvites ? (
                <Invites>
                    {Example.listOfListsOfGuests.map((guests, index) => (
                        <div id={`invite-${index}`} key={index}>
                            <Invitation
                                mainText={mainText}
                                additionalText={additionalText}
                                guestText={guestText}
                                propsGuestList={guests}
                            />
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: '2rem' }}>
                                <Checkbox
                                    checked={deliveredInvites.includes(index)}
                                    onChange={() => {
                                        deliveredInvites.includes(index) ?
                                            setDeliveredInvites(deliveredInvites.filter((invite) => invite != index)) :
                                            setDeliveredInvites([...deliveredInvites, index])
                                    }
                                    }
                                />
                                Delivered Invite
                            </div>
                        </div>
                    ))}
                </Invites>
            ) : (
                <div id="invite-single">
                    <Invitation
                        mainText={mainText}
                        additionalText={additionalText}
                        guestText={guestText}
                    />
                </div>
            )}
        </Container>
    );
};

export default PrintablesPage;
