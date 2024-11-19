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
    margin-top: 2rem;
`;

const Invitation: React.FC<InvitationProps> = ({ propsGuestList, mainText, guestText, additionalText }) => {
    const { names, surnames, weddingDate, weddingTime, weddingLocation, guestList } = useUser();
    const newGuestList = propsGuestList ? propsGuestList : guestList.slice(0, 3);;
    return (
        <Border>
            <Container>
                <Heading level={1}></Heading>
                <Heading level={1}>{names[0]} {surnames[0]}</Heading>
                <Subtitle level={1}> ------ and ------ </Subtitle>
                <Heading level={1}>{names[1]} {surnames[1]}</Heading>
                <Body size='big'>{mainText ? mainText : "Request the pleasure of your company at the celebration of their marriage"}</Body>
                <Subtitle level={2}>{weddingDate} {weddingTime}</Subtitle>
                <Body size='big'>{weddingLocation.join(', ')}</Body>
                <Subtitle level={2}>  {guestText ? guestText : "It would be our honor to celebrate this day with:"}</Subtitle>

                {newGuestList.map((guest, index) => (
                    <span key={index}><Body size='big'>{guest.name}</Body></span>
                ))}
                {
                    additionalText && (
                        <Body size="bold">{additionalText}</Body>
                    )
                }
            </Container >
        </Border>
    );
};

export default Invitation;
