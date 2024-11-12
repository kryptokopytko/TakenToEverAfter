import React from 'react';
import { Body, Heading, Subtitle } from "../../styles/typography";
import styled from 'styled-components';
import { useUser } from '../../providers/UserContext';

interface InvitationProps {
    additionalText?: string;
    mainText?: string;
    guestText?: string;
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
`;

const Invitation: React.FC<InvitationProps> = ({ mainText, guestText, additionalText }) => {
    const { bridesName, groomsName, bridesSurname, groomsSurname, weddingDate, weddingTime, location, guestList } = useUser();

    return (
        <Border>
            <Container>
                <Heading level={1}></Heading>
                <Heading level={1}>{bridesName} {bridesSurname}</Heading>
                <Subtitle level={1}> ------ and ------ </Subtitle>
                <Heading level={1}>{groomsName} {groomsSurname}</Heading>
                <Body size='big'>{mainText ? mainText : "Request the pleasure of your company at the celebration of their marriage"}</Body>
                <Subtitle level={2}>{weddingDate} {weddingTime}</Subtitle>
                <Body size='big'>{location.join(', ')}</Body>
                <Subtitle level={2}>  {guestText ? guestText : "It would be our honor to celebrate this day with:"}</Subtitle>

                {guestList.map((guest, index) => (
                    <span key={index}><Body size='big'>{guest}</Body></span>
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
