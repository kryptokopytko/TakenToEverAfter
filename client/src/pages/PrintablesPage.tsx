import React, { useState } from "react";
import styled from "styled-components";
import { Heading, Subtitle } from "../styles/typography";
import { Container, MenuContainer } from "../styles/page";
import Invitation from "../sections/Invitation";
import Input from "../components/Input";  // import komponentu Input

interface PrintablesPageProps {
    bridesName: string;
    groomsName: string;
    bridesSurname: string;
    groomsSurname: string;
    date: string;
    time: string;
    location: string[];
}

// Kontener na Inputy
const InputWrapper = styled.div`
  margin-bottom: 1rem;
`;

const PrintablesPage: React.FC<PrintablesPageProps> = ({ bridesName, groomsName, bridesSurname, groomsSurname, time, date, location }) => {
    const [mainText, setMainText] = useState("Request the pleasure of your company at the celebration of their marriage");
    const [additionalText, setAdditionalText] = useState("Come 15 minutes before the start of the ceremony");
    const [guestText, setGuestText] = useState("It would be our honor to celebrate this day with:");

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


            </MenuContainer>

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
        </Container>
    );
};

export default PrintablesPage;
