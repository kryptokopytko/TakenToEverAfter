import styled from "styled-components";
import { Body, Label } from "../../styles/typography";
import { GridContainer } from "../../styles/section";
import { Guest } from "../../types";
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
  list: Guest[];
  isExpanded: boolean;
  isHomePage?: boolean;
}

const List: React.FC<ListProps> = ({ list, isExpanded, isHomePage }) => {
  const FunctionsProxy = useFunctionsProxy();
  const { tags, language } = useUser();

  return (
    <GridContainer isExpanded={isExpanded} minWidth="30rem">
      {list.length === 0 ? (
        <EmptyMessage>{translations[language].noGuests}</EmptyMessage>
      ) : (
        list.map((guest, index) => (
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
                <Button variant="transparent" onClick={() => FunctionsProxy.handOutInvitation(guest.invitationId)}>
                  {translations[language].invite}
                </Button>
                <Button variant="transparent" onClick={() => FunctionsProxy.updateGuestConfirmation(guest.id, true)}>
                  {translations[language].yes}
                </Button>
                <Button variant="transparent" onClick={() => FunctionsProxy.updateGuestConfirmation(guest.id, false)}>
                  {translations[language].no}
                </Button>
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
