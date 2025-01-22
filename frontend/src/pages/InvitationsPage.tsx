import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Heading, Subtitle } from "../styles/typography";
import { Container, MenuContainer } from "../styles/page";
import Invitation from "../sections/Printables/Invitation";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { exportToPDF } from "../sections/Printables/exportToPdf";
import Checkbox from "../components/ui/Checkbox";
import { useUser } from "../providers/UserContext";
import { translations } from "../translations";
import useFunctionsProxy from "../API/FunctionHandler";

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
    const { guests, language, invitations } = useUser();
    const [mainText, setMainText] = useState(translations[language].exampleMainText);
    const [additionalText, setAdditionalText] = useState(translations[language].exampleAdditionalText);
    const [guestText, setGuestText] = useState(translations[language].exampleGuestText);
    const [showAllInvites, setShowAllInvites] = useState(false);
    const [deliveredInvites, setDeliveredInvites] = useState<number[]>([]);
    const FunctionsProxy = useFunctionsProxy();

    useEffect(() => {
        if (language) {
            setMainText(translations[language].exampleMainText);
            setAdditionalText(translations[language].exampleAdditionalText);
            setGuestText(translations[language].exampleGuestText);
        }
    }, [language]);

    useEffect(() => {
        const handedOut = invitations
            .filter((invitation) => invitation.handedOut)
            .map((invitation) => invitation.id);
        setDeliveredInvites(handedOut);
    }, [invitations]); 

    const handleExportPDF = () => {
        const inviteIds = guests.map((_, index) => `invite-${index}`);
        exportToPDF(inviteIds);
    };

    function toggleHandedOut(invitationId: number, index: number) {
        const handedOut = deliveredInvites.includes(index);
        handedOut ?
            setDeliveredInvites(deliveredInvites.filter((invite) => invite != index)) 
            : setDeliveredInvites([...deliveredInvites, index]);
        FunctionsProxy.changeInvitationStatus(invitationId, !handedOut);
    }

    return (

        <Container>
            <MenuContainer>
                <Heading level={2}>{translations[language].customizeInvitationText}</Heading>
                <Subtitle level={3}>{translations[language].additionalText}</Subtitle>

                <InputWrapper>
                    <Input
                        size="long"
                        value={additionalText}
                        onChange={(e) => setAdditionalText(e.target.value)}
                        placeholder={translations[language].additionalText}
                    />
                </InputWrapper>

                <Subtitle level={3}>{translations[language].guestText}</Subtitle>
                <InputWrapper>
                    <Input
                        size="long"
                        value={guestText}
                        onChange={(e) => setGuestText(e.target.value)}
                        placeholder={translations[language].guestText}
                    />
                </InputWrapper>

                <Subtitle level={3}>{translations[language].mainText}</Subtitle>
                <InputWrapper>
                    <Input
                        size="long"
                        value={mainText}
                        onChange={(e) => setMainText(e.target.value)}
                        placeholder={translations[language].mainText}
                    />
                </InputWrapper>

                <Button onClick={() => setShowAllInvites(!showAllInvites)}>
                    {showAllInvites ? translations[language].showSingleInvite : translations[language].showAllInvites}
                </Button>
                {showAllInvites ?
                    <Button onClick={handleExportPDF}>{translations[language].exportToPDF}</Button> : <></>}
            </MenuContainer>
            {showAllInvites ? (
                <Invites>
                    {invitations.filter(invitation => guests.some(guest => guest.invitationId == invitation.id))
                        .map((invitation, index) => (
                            <div id={`invite-${index}`} key={index}>
                                <Invitation
                                    mainText={mainText}
                                    additionalText={additionalText}
                                    guestText={guestText}
                                    invitationId={invitation.id}
                                />
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: '2rem' }}>
                                    <Checkbox
                                        checked={deliveredInvites.includes(invitation.id)}
                                        onChange={() =>
                                            toggleHandedOut(invitation.id, index)
                                        }
                                    />
                                    {translations[language].delivered}
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
