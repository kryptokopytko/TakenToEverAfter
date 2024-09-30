import { Body, Heading } from "../../../themes/typography";
import { Container, Section, ListContainer } from "./FooterStyles";
const Footer = () => {
  return (
    <Container>
      { }
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

      { }
      <Section>
        <Heading level={3}>Taken to Ever After</Heading>
        <Body>
          <Body>Your wedding planning made easy</Body>
        </Body>
      </Section>

      { }
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
