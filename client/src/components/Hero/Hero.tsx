import { Heading, Body, Subtitle } from "../../styles/typography";
import dancingPair from '/pictures/dancing1.png';
import { Container, Content, TextSection, HiddenText, ImageSection, Image, SummaryText } from "./HeroStyles";
const Hero = () => {
  return (
    <Container>
      <Content>
        <TextSection>
          <HiddenText>
            <Subtitle level={1}>
              Let us help you with:
            </Subtitle>
            <ul>
              <Body size='big'>♠ Guest Confirmations with QR codes</Body>
              <Body size='big'>♠ Budget Management and expense tracking</Body>
              <Body size='big'>♠ Task Management with deadlines and calendar views</Body>
              <Body size='big'>♠ Guest List Management with invitation status</Body>
              <Body size='big'>♠ Customized Email Notifications for RSVP updates</Body>
              <Body size='big'>♠ Personalized Theme customization</Body>
              <Body size='big'>♠ Seating Arrangement Suggestions with various table options</Body>
              <Body size='big'>♠ Exportable Seating Plan with guest names</Body>
              <Body size='big'>♠ Photo Album and guest photo uploads</Body>
              <Body size='big'>♠ Invitation and Place Card Generation</Body>
            </ul>
          </HiddenText>
        </TextSection>
        <ImageSection>
          <Heading level={1}>Taken to Ever After</Heading>
          <div>
            <Body size="big" style={{ display: 'inline', marginTop: '-2rem' }}>
              A comprehensive wedding planning app designed to help couples manage their special day effortlessly.
            </Body> <SummaryText>{' '}
              <Body size='big' style={{ display: 'inline' }}>
                From guest lists and RSVPs to budgeting and seating arrangements, we provide all the tools you need for a smooth and memorable wedding.
              </Body>
            </SummaryText></div>
          <Image src={dancingPair} alt="Dancing Couple" />
        </ImageSection>

      </Content>
    </Container>
  );
};

export default Hero;
