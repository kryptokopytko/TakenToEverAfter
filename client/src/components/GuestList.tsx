import styled from "styled-components";
import { Heading, Subtitle } from "../themes/typography";
import List from "./List";
import Button, { ButtonContainer } from "./Button";
import { useState } from "react";
import { SpaceBetweenContainer } from "../themes/section";

const SummaryContainer = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: -2rem;
  margin-bottom: 1rem;
  justify-content: center;
`

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
  { name: 'New Smurf', decision: 'not invited' },
];


const decisionTypes = ['yes', 'maybe', 'no', 'not invited'];

const GuestList = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const countDecisions = (decisionType: string) => {
    return guests.filter((guest) => guest.decision === decisionType).length;
  };

  const toggleList = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div>
      <SpaceBetweenContainer>
        <Heading level={1}>Guest List:</Heading>
        <Button onClick={toggleList}>
          {isExpanded ? 'Collapse List' : 'Expand List'}
        </Button>
      </SpaceBetweenContainer>
      <SummaryContainer>
        {decisionTypes.map((decision) => (
          <Subtitle key={decision} level={1}>
            {decision.charAt(0).toUpperCase() + decision.slice(1)}: {countDecisions(decision)}
          </Subtitle>
        ))}
      </SummaryContainer>
      <List list={guests} isExpanded={isExpanded} />

      <ButtonContainer>
        <Button>Invite more</Button>
        <Button>Manage Guests</Button>
      </ButtonContainer>
    </div>
  );
};

export default GuestList;
