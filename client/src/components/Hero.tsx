import styled from "styled-components";
import { Heading, Body, Subtitle } from "../themes/typography";
import dancingPair from '/pictures/dancing1.png';

const Container = styled.div`
  background-color: ${({ theme }) => theme.primaryLight};
  color: ${({ theme }) => theme.text};
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 0rem 2rem;

  @media (min-width: 1200px) {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
`;

const TextSection = styled.div`
  margin: 2rem 2rem;
  max-width: 35rem;

  @media (min-width: 1200px) {
    margin-left: 2rem;
    flex: 1;
    order: 2;
  }
`;

const ImageSection = styled.div`
  @media (min-width: 1200px) {
    flex: 1;
    order: 1;
    margin-right: 2rem;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  
`;

const HiddenText = styled.div`
  display: none;
  @media (min-width: 1200px) {
    display: block;
  }
`;

const Image = styled.img`
  width: 70%;
  max-width: 60rem;
  margin: 1rem 2rem;
  margin-bottom: 0;

  @media (min-width: 1200px) {
    width: 60%;
  }

  @media (max-width: 800px) {
    width: 80%;
  }
`;

const SummaryText = styled.span`
  display: inline;

  @media (min-width: 1200px) {
    display: none;
  }
`;

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
              <Body>Guest Confirmations with QR codes</Body>
              <Body>Budget Management and expense tracking</Body>
              <Body>Task Management with deadlines and calendar views</Body>
              <Body>Guest List Management with invitation status</Body>
              <Body>Customized Email Notifications for RSVP updates</Body>
              <Body>Personalized Theme customization</Body>
              <Body>Seating Arrangement Suggestions with various table options</Body>
              <Body>Exportable Seating Plan with guest names</Body>
              <Body>Photo Album and guest photo uploads</Body>
              <Body>Invitation and Place Card Generation</Body>
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
