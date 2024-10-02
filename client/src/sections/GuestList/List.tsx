import styled from "styled-components";
import { Body, Label } from "../../styles/typography";
import { GridContainer } from "../../styles/section";
import { Guest } from "../../types";
import Button from "../../components/Button";
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


interface ListProps {
  list: Guest[];
  isExpanded: boolean;
  isHomePage?: boolean;
}

const List: React.FC<ListProps> = ({ list, isExpanded, isHomePage }) => {
  return (
    <GridContainer isExpanded={isExpanded} minWidth="30rem">
      {list.map((guest, index) => (
        <GuestItem key={index}>
          <Body size="big">{guest.name}</Body>
          <TagContainer>
            {guest.tags.map((tag, idx) => tag && <Tag key={idx}>{tag}</Tag>)}
          </TagContainer>
          {guest.decision === 'maybe' && !isHomePage ?
            <DecisionButtons>
              <Button variant="transparent"> yes/ </Button>
              <Button variant="transparent"> no </Button>
            </DecisionButtons> :
            <Label size="small">{guest.decision}</Label>}
        </GuestItem>
      ))}
    </GridContainer>
  );
};

export default List;
