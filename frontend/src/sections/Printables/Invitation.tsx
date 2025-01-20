import React from 'react';
import { Body, Heading, Subtitle } from "../../styles/typography";
import styled from 'styled-components';
import { useUser } from '../../providers/UserContext';
import { Guest } from '../../types';
import { translations } from "../../translations";

interface InvitationProps {
    additionalText?: string;
    mainText?: string;
    guestText?: string;
    propsGuestList?: Guest[];
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

const Invitation: React.FC<InvitationProps> = ({ propsGuestList, mainText, guestText, additionalText, children }) => {
    const { account, accountDetails, weddingDetails, guests, language } = useUser();
    const newGuestList = propsGuestList ? propsGuestList : guests.slice(0, 3);;
    return (
        <Border>
            <Container>
                <Heading level={1}></Heading>
                <Heading level={1}>{account.brideName} {weddingDetails?.brideSurname || ""}</Heading>
                <Subtitle level={1}> ------ & ------ </Subtitle>
                <Heading level={1}>{account.groomName} {weddingDetails?.groomSurname || ""}</Heading>
                <Body size='big'>{mainText ? mainText : translations[language].exampleMainText}</Body>
                <Subtitle level={2}>{accountDetails.weddingDate} {weddingDetails && (weddingDetails.weddingTime)}</Subtitle>
                {weddingDetails && (<Body size='big'>{weddingDetails.weddingLocation.join(', ')}</Body>)}
                <Subtitle level={2}>  {guestText ? guestText : translations[language].exampleGuestText}</Subtitle>

                {newGuestList.map((guest, index) => (
                    <span key={index}><Body size='big'>{guest.name}</Body></span>
                ))}
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
