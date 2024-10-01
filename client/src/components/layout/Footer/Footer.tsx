import { Body, Heading } from "../../../styles/typography";
import { HidingSection, Container, Section, ListContainer } from "./FooterStyles";

interface FooterProps {
  sections: string[];
}

const Footer: React.FC<FooterProps> = ({ sections }) => {
  return (
    <Container>
      <HidingSection>
        <Heading level={3}>Sections</Heading>

        <ListContainer>
          {sections.map((section) => (
            <Body>{section}</Body>
          ))}
          <Body>Guest List</Body>
          <Body>To Do</Body>
          <Body>Choices</Body>
          <Body>Budget</Body>
          <Body>Create Theme</Body>
          <Body>Photo Album</Body>
          <Body>Table Chart</Body>
        </ListContainer>
      </HidingSection>

      <Section>
        <span style={{ textAlign: 'center' }} >
          <Heading level={3}>Taken to Ever After</Heading>
        </span>
        <Body>
          <Body>Your wedding planning made easy</Body>
        </Body>
      </Section>

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
