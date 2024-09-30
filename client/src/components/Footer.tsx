import styled from "styled-components";
import { Body, Heading } from "../themes/typography";

const Container = styled.div`
  padding: 2rem 0rem; 
  background-color: ${({ theme }) => theme.light};
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  text-align: left;

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const Section = styled.div`
  flex: 1;
  min-width: 12rem; 
  margin: 1rem;
  display:flex;
  flex-direction: column;
  align-items:center;
max-width: 25rem;
`;

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(6rem, 1fr));
margin-top: -2rem;
gap: 0.5rem;
width:100%;
`;

const Footer = () => {
  return (
    <Container>
      {}
      <Section>
        <Heading level={3}>Sections</Heading>
        <ListContainer>
          <Body>Guest List</Body>
          <Body>To Do</Body>
          <Body>Choices</Body>
          <Body>Budget</Body>
          <Body>Create Theme</Body>
          <Body>Photo Album</Body>
          <Body>Table Chart</Body></ListContainer>
      </Section>

      {}
      <Section>
        <Heading level={3}>Taken to Ever After</Heading>
        <Body>
          <Body>Your wedding planning made easy</Body>
        </Body>
      </Section>

      {}
      <Section>
        <Heading level={3}>Contact</Heading>
        <div>
          <Body>Address: 123 Wedding Lane</Body>
          <Body>City, State, ZIP: Wedding City, WC 12345</Body>
          <Body>Phone: (123) 456-7890</Body>
          <Body>Email: contact@takentoeverafter.com</Body>
        </div>  </Section>
    </Container>
  );
};

export default Footer;
