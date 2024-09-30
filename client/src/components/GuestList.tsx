import styled from "styled-components";
import { Heading } from "../themes/typography";
import List from "./List";
import Button, {ButtonContainer} from "./Button";
import { useState } from "react";
import { SpaceBetweenContainer } from "../themes/section";

const GuestListContainer = styled.div`
  padding: 3rem;
`;

const Container = styled.div`
  background-color: ${({ theme }) => theme.light};
  padding: 2rem 0;
  width: 100%;
`;


const guests = [
  { name: 'Papa Smurf', decision: 'yes' },
  { name: 'Smurfette', decision: 'yes' },
  { name: 'Brainy Smurf', decision: 'maybe' },
  { name: 'Clumsy Smurf', decision: 'yes' },
  { name: 'Hefty Smurf', decision: 'yes' },
  { name: 'Grouchy Smurf', decision: 'no' },
  { name: 'Jokey Smurf', decision: 'yes' },
  { name: 'Painter Smurf', decision: 'maybe' },
  { name: 'Baker Smurf', decision: 'yes' },
  { name: 'Chef Smurf', decision: 'yes' },
  { name: 'Farmer Smurf', decision: 'maybe' },
  { name: 'Greedy Smurf', decision: 'no' },
  { name: 'Sassy Smurf', decision: 'yes' },
  { name: 'Vanity Smurf', decision: 'maybe' },
  { name: 'Baby Smurf', decision: 'yes' },
  { name: 'Papa Smurf', decision: 'yes' },
  { name: 'Smurf Lily', decision: 'yes' },
  { name: 'Smurf Storm', decision: 'maybe' },
  { name: 'Scaredy Smurf', decision: 'no' },
  { name: 'Dizzy Smurf', decision: 'yes' },
  { name: 'Snappy Smurf', decision: 'yes' },
];


const GuestList = () => {
  const [isExpanded, setIsExpanded] = useState(false); 

  const toggleList = () => {
    setIsExpanded((prev) => !prev); 
  };


  return (
    <Container>
      <GuestListContainer>
        <SpaceBetweenContainer>
        <Heading level={1}>Guest List</Heading>
        <Button onClick={toggleList}>
        {isExpanded ? 'Collapse List' : 'Expand List'}
      </Button>
      </SpaceBetweenContainer>
        <List list={guests} isExpanded={isExpanded} />
        <ButtonContainer>
          <Button>Invite more</Button>
          <Button>Manage Guests</Button>
        </ButtonContainer>
      </GuestListContainer>
    </Container>
  );
};

export default GuestList;
