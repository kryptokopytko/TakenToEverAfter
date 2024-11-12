import React, { useState } from "react";
import styled from "styled-components";
import { Heading, Subtitle } from "../styles/typography";
import { Container, MenuContainer } from "../styles/page";
import Invitation from "../sections/Invitation";
import Input from "../components/Input";
import Button from "../components/Button";
import { exportToPDF } from "../sections/Printables/exportToPdf";

interface PrintablesPageProps {
    bridesName: string;
    groomsName: string;
    bridesSurname: string;
    groomsSurname: string;
    date: string;
    time: string;
    location: string[];
    listOfGuests: string[][];
}

const InputWrapper = styled.div`
  margin-bottom: 1rem;
`;

const Invites = styled.div`
    background-color: ${({ theme }) => theme.tertiary} !important;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem !important;
    & > * {
        background-color:  ${({ theme }) => theme.primary};
    }
`;

const PrintablesPage: React.FC<PrintablesPageProps> = ({
    bridesName,
    groomsName,
    bridesSurname,
    groomsSurname,
    date,
    time,
    location,
    listOfGuests
}) => {
    const [mainText, setMainText] = useState("Request the pleasure of your company at the celebration of their marriage");
    const [additionalText, setAdditionalText] = useState("Come 15 minutes before the start of the ceremony");
    const [guestText, setGuestText] = useState("It would be our honor to celebrate this day with:");
    const [showAllInvites, setShowAllInvites] = useState(false);

    // Funkcja do eksportowania zaproszeń do PDF
    const handleExportPDF = () => {
        const inviteIds = listOfGuests.map((_, index) => `invite-${index}`);
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
                    {listOfGuests.map((guests, index) => (
                        <div id={`invite-${index}`} key={index}>
                            <Invitation
                                bridesName={bridesName}
                                groomsName={groomsName}
                                bridesSurname={bridesSurname}
                                groomsSurname={groomsSurname}
                                guests={guests}
                                date={date}
                                time={time}
                                location={location}
                                mainText={mainText}
                                additionalText={additionalText}
                                guestText={guestText}
                            />
                        </div>
                    ))}
                </Invites>
            ) : (
                <div id="invite-single">
                    <Invitation
                        bridesName={bridesName}
                        groomsName={groomsName}
                        bridesSurname={bridesSurname}
                        groomsSurname={groomsSurname}
                        guests={["Papa Smurf", "Vanity Smurf", "Brainy Smurf"]}
                        date={date}
                        time={time}
                        location={location}
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
