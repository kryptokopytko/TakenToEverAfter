import React from 'react';
import { Body, Heading, Subtitle } from "../../styles/typography";
import styled from 'styled-components';
import { useUser } from '../../providers/UserContext';
import { Guest } from '../../types';

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
    const { account, accountDetails, weddingDetails, guests } = useUser();
    const newGuestList = propsGuestList ? propsGuestList : guests.slice(0, 3);;
    return (
        <Border>
            <Container>
                <Heading level={1}></Heading>
                <Heading level={1}>{account.groomName} {account.brideName}</Heading>
                <Subtitle level={1}> ------ and ------ </Subtitle>
                <Heading level={1}>{account.groomName} {account.brideName}</Heading>
                <Body size='big'>{mainText ? mainText : "Request the pleasure of your company at the celebration of their marriage"}</Body>
                <Subtitle level={2}>{accountDetails.weddingDate} {weddingDetails && (weddingDetails.weddingTime)}</Subtitle>
                {weddingDetails && (<Body size='big'>{weddingDetails.weddingLocation.join(', ')}</Body>)}
                <Subtitle level={2}>  {guestText ? guestText : "It would be our honor to celebrate this day with:"}</Subtitle>

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
