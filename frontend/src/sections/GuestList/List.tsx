import styled from "styled-components";
import { Body, Label } from "../../styles/typography";
import { GridContainer } from "../../styles/section";
import { Guest } from "../../types";
import Button from "../../components/ui/Button";
import { Tag, TagContainer } from "../../styles/tag";
import useFunctionsProxy from "../../FunctionHandler";

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
  handleDecision: (guestId: number, decision: 'yes' | 'no') => void;
  handleInvite: (guestName: string) => void;
}

const List: React.FC<ListProps> = ({ list, isExpanded, isHomePage, handleDecision, handleInvite }) => {
  const FunctionsProxy = useFunctionsProxy();
  const sharedInviteNames: string[] = FunctionsProxy.getAllSharedInviteNames();

  return (
    <GridContainer isExpanded={isExpanded} minWidth="30rem">
      {list.length === 0 ? (
        <EmptyMessage>No such guests</EmptyMessage>
      ) : (
        list.map((guest, index) => (
          <GuestItem key={index}>
            <Body size="big">{guest.name}</Body>
            <TagContainer>
              {guest.tags.map((tag, idx) => tag && 
              <Tag isOneInvite={sharedInviteNames.includes(tag)} key={idx}>{tag}</Tag>
              )}
            </TagContainer>
            {guest.decision === 'unknown' && !isHomePage ? (
              <DecisionButtons>
                <Button variant="transparent" onClick={() => handleInvite(guest.name)}>Invite</Button>
                <Button variant="transparent" onClick={() => handleDecision(guest.id, 'yes')}>yes/</Button>
                <Button variant="transparent" onClick={() => handleDecision(guest.id, 'no')}>no</Button>
              </DecisionButtons>
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
