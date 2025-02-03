import styled from "styled-components";
import { Body, Label } from "../../styles/typography";
import { GridContainer } from "../../styles/section";
import Button from "../../components/ui/Button";
import { StyledTag, TagContainer } from "../../styles/tag";
import useFunctionsProxy from "../../API/FunctionHandler";
import { useUser } from "../../providers/UserContext";
import { translations } from "../../translations";

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
  isExpanded: boolean;
  isHomePage?: boolean;
  sortBy?: 'asc' | 'desc';
  filterByTag?: string;
  filterByDecision?: string;
}

const List: React.FC<ListProps> = ({ isExpanded, isHomePage, sortBy, filterByTag, filterByDecision }) => {
  const FunctionsProxy = useFunctionsProxy();
  const { tags, language, guests, setGuests } = useUser();
  
  const processedGuests = guests
    .filter(guest => {
      if (filterByTag) {
        const tag = tags.find(t => t.name === filterByTag);
        if (!tag || !guest.tags.includes(tag.id)) {
          return false;
        }
      }

      if (filterByDecision && guest.decision !== filterByDecision) {
        return false;
      }

      return true;
    });

    if (sortBy) {
      processedGuests.sort((a, b) => {
        const comparison = a.name.localeCompare(b.name);
        return sortBy === 'asc' ? comparison : -comparison;
      });
    }

  async function handleDecision(guestId: number, decision: boolean) {
    const guest = guests.find(guest => guest.id == guestId);
    await FunctionsProxy.updateGuest({...guest!, decision: decision? "yes" : "no"});
    setGuests(
      guests.map((guest) =>
        guest.id === guestId ? { ...guest, decision: decision? "yes" : "no" } : guest)
    )
  }

  return (
    <GridContainer isExpanded={isExpanded} minWidth="30rem">
      {guests.length === 0 ? (
        <EmptyMessage>{translations[language].noGuests}</EmptyMessage>
      ) : (
        processedGuests.map((guest, index) => (
          <GuestItem key={index}>
            <Body size="big">{guest.name}</Body>
            <TagContainer>
              {guest.tags.map((tagId, idx) => {
                const tag = tags.find(tag => tag.id === tagId);
                return tag ? (
                  <StyledTag isOneInvite={false} key={idx}>
                    {tag.name}
                  </StyledTag>
                ) : null; 
              })}
              <StyledTag isOneInvite={true} key={"invitation"}>
                {guest.invitationId}
              </StyledTag>
            </TagContainer>
            {guest.decision === 'unknown' && !isHomePage ? (
              <DecisionButtons>
                <Button variant="transparent" onClick={() => handleDecision(guest.id, true)}>
                  {translations[language].yes}/
                </Button>
                <Button variant="transparent" onClick={() => handleDecision(guest.id, false)}>
                  {translations[language].no}
                </Button>
              </DecisionButtons>
            ) : (
              <Label size="small">{translations[language][guest.decision]}</Label>
            )}
          </GuestItem>
        ))
      )}
    </GridContainer>
  );
};

export default List;
