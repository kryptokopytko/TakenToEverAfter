import { Heading, Body, Subtitle } from "../../styles/typography";
import dancingPair from '/pictures/dancing1.png';
import { LinkList, Container, Content, TextSection, HiddenText, ImageSection, Image } from "./HeroStyles";
import { translations } from "../../translations";
import { useUser } from "../../providers/UserContext";

const Hero = () => {
  const {language} = useUser();

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Container>
      <Content>
        <TextSection>
          <HiddenText>
            <Subtitle level={1}>
              {translations[language].letUsHelp + ":"}
            </Subtitle>
            <LinkList>
              <Body size='big' onClick={() => scrollToSection('guest-list')}>
                {"♠ " + translations[language].guestConfirmations}
              </Body>
              <Body size='big' onClick={() => scrollToSection('budget')}>
                {"♠ " + translations[language].budgetManagement}
              </Body>
              <Body size='big' onClick={() => scrollToSection('to-do')}>
                {"♠ " + translations[language].taskManagement}
              </Body>
              <Body size='big' onClick={() => scrollToSection('guest-list')}>
                {"♠ " + translations[language].guestListManagement}
              </Body>
              <Body size='big' onClick={() => scrollToSection('guest-list')}>
                {"♠ " + translations[language].emailNotifications}
              </Body>
              <Body size='big' onClick={() => scrollToSection('theme-constructor')}>
                {"♠ " + translations[language].themeCustomization}
              </Body>
              <Body size='big' onClick={() => scrollToSection('table-chart')}>
                {"♠ " + translations[language].seatingArrangements}
              </Body>
              <Body size='big' onClick={() => scrollToSection('table-chart')}>
                {"♠ " + translations[language].exportableSeatingPlan}
              </Body>
              <Body size='big' onClick={() => scrollToSection('photo-album')}>
                {"♠ " + translations[language].photoAlbum}
              </Body>
              <Body size='big' onClick={() => scrollToSection('printables')}>
                {"♠ " + translations[language].invitationGeneration}
              </Body>
            </LinkList>
          </HiddenText>
        </TextSection>
        <ImageSection>
          <Heading level={1}>{translations[language].appName}</Heading>
          <div>
            <Body size="big" style={{ display: 'inline', marginTop: '-2rem' }}>
              {translations[language].appDescription}
            </Body>
          </div>
          <Image src={dancingPair} alt="Dancing Couple" />
        </ImageSection>
      </Content>
    </Container>
  );
};

export default Hero;
