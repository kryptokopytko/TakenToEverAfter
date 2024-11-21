import styled from "styled-components";
import { Heading } from "../../styles/typography";
import Button from "../../components/ui/Button";
import { SpaceBetweenContainer } from "../../styles/section";
import { Link } from "react-router-dom";
import Invitation from "./Invitation";

const Container = styled.div`
    text-align: center;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;


interface PrintablesProps {
  isHomePage?: boolean;
}

const Printables: React.FC<PrintablesProps> = ({ isHomePage }) => {

  return (
    <>
      <SpaceBetweenContainer>
        <Heading level={2}>Prints</Heading>
        {isHomePage ?
          <Link to="printables">
            <Button>Manage Prints</Button></Link> : <></>}
      </SpaceBetweenContainer>
      <Container>
        <Invitation />

      </Container>
    </>
  );
};


export default Printables;
