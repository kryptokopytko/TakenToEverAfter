import React, { useEffect, useState } from 'react';
import { Body, Heading, Subtitle } from "../../styles/typography";
import styled from 'styled-components';
import { useUser } from '../../providers/UserContext';
import { translations } from "../../translations";
import { generateQRCode } from '../../QRCodeGenerator';
import { Guest, InvitationDetails } from '../../types';

interface InvitationProps {
    additionalText?: string;
    mainText?: string;
    guestText?: string;
    invitationId?: number;
    guestList?: Guest[];
    details?: InvitationDetails;
    children?: React.ReactNode;
}


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 1rem;
    margin: 1rem;
    background-color:  ${({ theme }) => theme.primary};
`;

const Border = styled.div`
    background-color:  ${({ theme }) => theme.tertiary};
    padding: 0.5rem;
    margin: 2rem;
    @media (max-width: 400px) {
    margin: 0rem;
  }
`;

const Invitation: React.FC<InvitationProps> = ({ invitationId, guestList, mainText, guestText, additionalText, details, children }) => {
    const { account, accountDetails, weddingDetails, guests, language, invitations } = useUser();
    const newInvitationId = invitationId ? invitationId : guests[0].invitationId;
    const invitationGuests = guestList? guestList : guests.filter(guest => guest.invitationId == newInvitationId);
    const [ QRCode, setQRCode ] = useState<string | null>(null);

    useEffect(() => {
        const gen = async () => {
            const invitationUrl = invitations.find(invitation => invitation.id == newInvitationId)?.confirmationUrl;
            const code = await generateQRCode(`http://192.168.1.55:5173/guest_response/${invitationUrl}`);
            setQRCode(code);
        };
    
        gen();
    }, [invitationId, invitations]);

    return (
        <Border>
            <Container>
                <Heading level={1}></Heading>
                {details?
                    <Heading level={1}>{details.brideName} </Heading>
                    : <Heading level={1}>{account.brideName} {weddingDetails?.brideSurname || ""}</Heading>
                }
                <Subtitle level={1}> ------ & ------ </Subtitle>
                {details?
                    <Heading level={1}>{details.groomName} </Heading>
                    : <Heading level={1}>{account.groomName} {weddingDetails?.groomSurname || ""}</Heading>
                }
                
                <Body size='big'>{mainText ? mainText : translations[language].exampleMainText}</Body>
                
                {details?
                    <Subtitle level={2}>{details.weddingDate} </Subtitle>
                    : <>
                        <Subtitle level={2}>{accountDetails.weddingDate} {weddingDetails && (weddingDetails.weddingTime)}</Subtitle>
                        {weddingDetails && (<Body size='big'>{weddingDetails.weddingLocation.join(', ')}</Body>)}
                      </>
                }
                
                <Subtitle level={2}>  {guestText ? guestText : translations[language].exampleGuestText}</Subtitle>

                {invitationGuests.map((guest, index) => (
                    <span key={index}><Body size='big'>{guest.name}</Body></span>
                ))}
                
                {QRCode && <img src={QRCode} alt="QR Code" style={{ maxWidth: "100%", height: "auto" }} />}

                {
                    additionalText && (
                        <Body size="bold">{additionalText}</Body>
                    )
                }
                {children && ( 
                    <div>{children}</div>
                )}
            </Container >
        </Border>
    );
};

export default Invitation;
