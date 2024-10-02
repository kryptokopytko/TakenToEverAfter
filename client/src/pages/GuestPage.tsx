import styled from "styled-components";
import GuestList from "../sections/GuestList";

const Container = styled.div`
  width: 100%;
  position:relative;
  overflow: hidden;
  & > * {
    padding: 0 3rem;
    width: calc(100% - 6rem);
  }
  background-color: ${({ theme }) => theme.primary}; 
  margin-top: 5rem;
`

const GuestPage = () => {

  return (
    <Container>
      <GuestList isHomePage={false} />
    </Container>
  );
};

export default GuestPage;
