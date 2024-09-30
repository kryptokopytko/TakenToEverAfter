import styled from "styled-components";
import { Body, Label } from "../themes/typography";
import { GridContainer } from "../themes/section";

const GuestItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.secondary};
`;

interface ListProps {
  list: { name: string; decision: string }[];
  isExpanded: boolean;
}

const List: React.FC<ListProps> = ({ list, isExpanded }) => {

  return (
    <div>

      <GridContainer isExpanded={isExpanded}>
        {list.map((guest, index) => (
          <GuestItem key={index}>
            <Body size="big">{guest.name}</Body>
            <Label size="small">{guest.decision}</Label>
          </GuestItem>
        ))}
      </GridContainer>
    </div>
  );
};

export default List;
