import styled from "styled-components";
import { Heading } from "../themes/typography";
const Container = styled.div`
  padding: 2rem;
  text-align: center;
`;

const Hero = () => {
 
  return (
  <Container>
        <Heading level={2}>We leave the task of coming up with a title for this page to the reader</Heading>
       </Container>
  );
};


export default  Hero;
