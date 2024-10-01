import { Heading, Body, Subtitle } from "../../../styles/typography";
import dancingPair from '/pictures/dancing1.png';
import { LinkList, Container, Content, TextSection, HiddenText, ImageSection, Image, SummaryText } from "./HeroStyles";

const Hero = () => {
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
              Let us help you with:
            </Subtitle>
            <LinkList>
              <Body size='big' onClick={() => scrollToSection('guest-list')}>
                ♠ Guest Confirmations with QR codes
              </Body>
              <Body size='big' onClick={() => scrollToSection('budget')}>
                ♠ Budget Management and expense tracking
              </Body>
              <Body size='big' onClick={() => scrollToSection('to-do')}>
                ♠ Task Management with deadlines and calendar view
              </Body>
              <Body size='big' onClick={() => scrollToSection('guest-list')}>
                ♠ Guest List Management with invitation status
              </Body>
              <Body size='big' onClick={() => scrollToSection('guest-list')}>
                ♠ Customized Email Notifications for RSVP updates
              </Body>
              <Body size='big' onClick={() => scrollToSection('theme-constructor')}>
                ♠ Personalized Theme customization
              </Body>
              <Body size='big' onClick={() => scrollToSection('table-chart')}>
                ♠ Seating Arrangements with various preferences
              </Body>
              <Body size='big' onClick={() => scrollToSection('table-chart')}>
                ♠ Exportable Seating Plan with guest names
              </Body>
              <Body size='big' onClick={() => scrollToSection('photo-album')}>
                ♠ Photo Album and guest photo uploads
              </Body>
              <Body size='big' onClick={() => scrollToSection('printables')}>
                ♠ Invitation and Place Card Generation
              </Body>
            </LinkList>
          </HiddenText>
        </TextSection>
        <ImageSection>
          <Heading level={1}>Taken to Ever After</Heading>
          <div>
            <Body size="big" style={{ display: 'inline', marginTop: '-2rem' }}>
              A comprehensive wedding planning app designed to help couples manage their special day effortlessly.
            </Body>
            <SummaryText>{' '}
              <Body size='big' style={{ display: 'inline' }}>
                From guest lists and RSVPs to budgeting and seating arrangements, we provide all the tools you need for a smooth and memorable wedding.
              </Body>
            </SummaryText>
          </div>
          <Image src={dancingPair} alt="Dancing Couple" />
        </ImageSection>
      </Content>
    </Container>
  );
};

export default Hero;
