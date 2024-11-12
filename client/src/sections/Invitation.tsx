import React from 'react';
import { Body, Heading, Label, Subtitle } from "../styles/typography";
import styled from 'styled-components';

interface InvitationProps {
    bridesName: string;
    groomsName: string;
    bridesSurname: string;
    groomsSurname: string;
    guests: string[];
    date: string;
    time: string;
    location: string[];
    additionalText?: string;
    mainText?: string;
    guestText?: string;
}

const GuestsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: -1rem;
`;

const GuestItem = styled.li`
`;


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const Invitation: React.FC<InvitationProps> = ({ mainText, guestText, bridesSurname, groomsSurname, bridesName, groomsName, guests, date, time, location, additionalText }) => {
    return (
        <Container>
            <Heading level={1}></Heading>
            <Heading level={1}>{bridesName} {bridesSurname}</Heading>
            <Subtitle level={1}> ------ and ------ </Subtitle>
            <Heading level={1}>{groomsName} {groomsSurname}</Heading>
            <Body size='big'>{mainText ? mainText : "Request the pleasure of your company at the celebration of their marriage"}</Body>
            <Subtitle level={2}>{date} {time}</Subtitle>
            <Body size='big'>{location.join(', ')}</Body>
            <Subtitle level={2}>  {guestText ? guestText : "It would be our honor to celebrate this day with:"}</Subtitle>
            <GuestsList>
                {guests.map((guest, index) => (
                    <GuestItem key={index}><Body size='big'>{guest}</Body></GuestItem>
                ))}
            </GuestsList>

            {
                additionalText && (
                    <Body size="bold">{additionalText}</Body>
                )
            }
        </Container >
    );
};

export default Invitation;
