import styled from "styled-components";
import { Heading, Subtitle } from "../../styles/typography";
import List from "./List";
import Button, { ButtonContainer } from "../../components/ui/Button";
import { useState } from "react";
import { SpaceBetweenContainer } from "../../styles/section";
import { exportToPDF } from "../Printables/exportToPdf";
import { decisionTypes } from "../../types";
import { Link } from "react-router-dom";
import { useUser } from "../../providers/UserContext";
import { translations } from "../../translations";

const SummaryContainer = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: -2rem;
  margin-bottom: 1rem;
  justify-content: center;
`;

interface GuestListProps {
  isHomePage?: boolean;
  children?: React.ReactNode;
}

const GuestList: React.FC<GuestListProps> = ({ isHomePage, children }) => {
  const [isExpanded, setIsExpanded] = useState(!isHomePage);
  const {guests, language} = useUser();

  const countDecisions = (decisionType: string) => {
    return guests.filter((guest) => guest.decision === decisionType).length;
  };

  const toggleList = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div id="guest-list">
      <SpaceBetweenContainer>
        <Heading level={1}>{translations[language].guestList + ":"}</Heading>
        {isHomePage ? (
          <Button onClick={toggleList}>
            {isExpanded ? translations[language].collapseList : translations[language].expandList}
          </Button>
        ) : (
          children
        )}
      </SpaceBetweenContainer>
      <SummaryContainer>
      {decisionTypes.map((decision) => {
        const decisionKey = decision as keyof typeof translations["english"];
        return (
          <Subtitle key={decision} level={1}>
            {translations[language][decisionKey]}: {countDecisions(decision)}
          </Subtitle>
        );
      })}
      </SummaryContainer>
      <List
        isHomePage={isHomePage} 
        list={guests} 
        isExpanded={isExpanded} 
      />
      <ButtonContainer>
        {isHomePage ?
          <Link to="guest_list">
            <Button>{translations[language].manageGuests}</Button> </Link>
          : <></>}
        <Button onClick={() => exportToPDF("guest-list")}>{translations[language].exportToPDF}</Button>
      </ButtonContainer>
    </div>
  );
};

export default GuestList;
