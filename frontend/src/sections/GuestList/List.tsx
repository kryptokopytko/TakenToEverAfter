import styled from "styled-components";
import { Body, Label } from "../../styles/typography";
import { GridContainer } from "../../styles/section";
import { Guest } from "../../types";
import Button from "../../components/ui/Button";
import { Tag, TagContainer } from "../../styles/tag";

const GuestItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.secondary};
`;

const DecisionButtons = styled.div`
  display: flex;
  margin-left: 1rem;
  align-items: center;
  height: 1rem;
  & > * {
    padding: 0rem;
  }
`;

const EmptyMessage = styled(Label)`
  text-align: center;
  margin: 1rem 0;
`;

interface ListProps {
  list: Guest[];
  isExpanded: boolean;
  isHomePage?: boolean;
  handleDecision: (guestName: string, decision: 'yes' | 'no') => void;
  handleInvite: (guestName: string) => void;
}

const List: React.FC<ListProps> = ({ list, isExpanded, isHomePage, handleDecision, handleInvite }) => {
  return (
    <GridContainer isExpanded={isExpanded} minWidth="30rem">
      {list.length === 0 ? (
        <EmptyMessage>No such guests</EmptyMessage>
      ) : (
        list.map((guest, index) => (
          <GuestItem key={index}>
            <Body size="big">{guest.name}</Body>
            <TagContainer>
              {guest.tags.map((tag, idx) => tag && <Tag key={idx}>{tag}</Tag>)}
            </TagContainer>
            {guest.decision === 'maybe' && !isHomePage ? (
              <DecisionButtons>
                <Button variant="transparent" onClick={() => handleDecision(guest.name, 'yes')}>yes/</Button>
                <Button variant="transparent" onClick={() => handleDecision(guest.name, 'no')}>no</Button>
              </DecisionButtons>
            ) : guest.decision === 'not invited' ? (
              <Button variant="transparent" onClick={() => handleInvite(guest.name)}>Invite</Button>
            ) : (
              <Label size="small">{guest.decision}</Label>
            )}
          </GuestItem>
        ))
      )}
    </GridContainer>
  );
};

export default List;
