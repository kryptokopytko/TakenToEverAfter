import React from 'react';
import { Body, Heading } from "../../../styles/typography";
import { HidingSection, Container, Section, ListContainer } from "./FooterStyles";
import { useTheme } from "../../../providers/ThemeContext";
import { sectionLinks, sections } from '../sections';
import { useUser } from '../../../providers/UserContext';
import { Slider } from '../../../Slider';

interface FooterProps { }

const Footer: React.FC<FooterProps> = () => {
  const { fontSize, setFontSize } = useTheme();
  const { viewLocation, language } = useUser();
  const currentSectionName = sectionLinks.find((section) => section.link === viewLocation) ?? {name: "Home"};
  const currentSection = sections.find((section) =>
    section.english.name === currentSectionName.name);

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(Number(e.target.value));
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 0);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Container>
      {currentSection!.english.name.toLowerCase() === 'home' ? (
        < HidingSection >
          <Heading level={3}>Sections</Heading>
          <ListContainer>
            {sections
              .filter(section => section.english.name !== 'Home')
              .sort()
              .map((section) => (
                <Body key={section.english.name} onClick={() => scrollToSection(section.english.name.toLowerCase().replace(/\s+/g, '-'))}>
                  {section[language].name}
                </Body>
              ))}
          </ListContainer>
        </HidingSection>
      ) : (
        <Section>
          <Heading level={3}>{currentSection![language].name}</Heading>
          <Body>
            {currentSection![language].description}
          </Body>
        </Section>
      )
      }

      <Section>
        <span style={{ textAlign: 'center', marginBottom: '-1rem' }}>
          <Heading level={3}>Taken to Ever After</Heading>
        </span>
        <div style={{ textAlign: 'center', display: "flex", alignItems: 'center' }}>
          <label htmlFor="fontSizeSlider"><Body>Adjust font size:</Body></label>
          <Slider
            type="range"
            id="fontSizeSlider"
            min="10"
            max="22"
            value={fontSize}
            onChange={handleFontSizeChange}
          />
          <span style={{ marginLeft: '0.5rem' }}><Body>{Math.round(fontSize)}px</Body></span>
        </div>
        <Body>Your wedding planning made easy</Body>
      </Section>


      <Section>
        <Heading level={3}>Contact</Heading>
        <div style={{ marginTop: '-2rem' }}>
          <Body>Email: takentoeverafter@gmail.com</Body>
          <Body>Phone: (+48) 123-456-789</Body>
          <Body>Address: 123 Wedding Lane</Body>
          <Body>Wroclaw, 12-345</Body>
        </div>
      </Section>
    </Container >
  );
};

export default Footer;
