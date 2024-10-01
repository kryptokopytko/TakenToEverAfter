import React from 'react';
import { Body, Heading } from "../../../styles/typography";
import { HidingSection, Container, Section, ListContainer } from "./FooterStyles";
import { useTheme } from "../../../providers/ThemeContext";

interface FooterProps {
  sections: string[];
}

const Footer: React.FC<FooterProps> = ({ sections }) => {
  const { fontSize, setFontSize, theme } = useTheme();

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {



    setFontSize(Number(e.target.value));


    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 0);
  };

  return (
    <Container>
      <HidingSection>
        <Heading level={3}>Sections</Heading>

        <ListContainer>
          {sections.map((section) => (
            <Body key={section} style={{ fontSize: `${fontSize}px` }}>{section}</Body>
          ))}
        </ListContainer>
      </HidingSection>

      <Section>
        <span style={{ textAlign: 'center', marginBottom: '-1rem' }}>
          <Heading level={3}>Taken to Ever After</Heading>
        </span>

        <Body style={{ fontSize: `${fontSize}px` }}>
          Your wedding planning made easy
        </Body>

        <div style={{ textAlign: 'center', display: "flex", alignItems: 'center' }}>
          <label htmlFor="fontSizeSlider"><Body>Adjust font size:</Body></label>
          <input
            type="range"
            id="fontSizeSlider"
            min="12"
            max="24"
            value={fontSize}
            onChange={handleFontSizeChange}
            style={{
              marginLeft: '1rem',
              appearance: 'none',
              width: '200px', 
              height: '6px', 
              background: theme.secondary, 
              borderRadius: '1rem', 
            }}
          />
          <span style={{ marginLeft: '0.5rem' }}><Body>{fontSize}px</Body></span>
        </div>
      </Section>

      <Section>
        <Heading level={3}>Contact</Heading>
        <div style={{ marginTop: '-2rem' }}>
          <Body style={{ fontSize: `${fontSize}px` }}>City, State, ZIP: Wedding City, WC 12345</Body>
          <Body style={{ fontSize: `${fontSize}px` }}>Email: contact@takentoeverafter.com</Body>
          <Body style={{ fontSize: `${fontSize}px` }}>Address: 123 Wedding Lane</Body>
          <Body style={{ fontSize: `${fontSize}px` }}>Phone: (123) 456-7890</Body>
        </div>
      </Section>
    </Container>
  );
};

export default Footer;
