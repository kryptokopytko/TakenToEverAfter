import styled from "styled-components";
import { Body, Heading, Label, Subtitle } from "../themes/typography";

const Container = styled.div`
  padding: 2rem 0;
  text-align: center;
  background-color: ${({ theme }) => theme.light};
width: 100%;
`;

const Footer = () => {

  return (
    <Container>
      <Heading level={1} color="secondary">This is a Heading</Heading>
      <Heading level={2} color="secondary">This is a Heading</Heading>
      <Heading level={3} color="secondary">This is a Heading</Heading>
      <Heading level={4} color="secondary">This is a Heading</Heading>

      <Subtitle level={1}>This is a Subtitle</Subtitle>
      <Subtitle level={2}>This is a Subtitle</Subtitle>
      <Subtitle level={3}>This is a Subtitle</Subtitle>
      <Subtitle level={4}>This is a Subtitle</Subtitle>
      <Body size="small" color="secondary">This is Body text</Body>
      <Body size="bold" color="secondary">This is Body text</Body>
      <Body color="secondary">This is Body text</Body>
      <Body size="big" color="secondary">This is Body text</Body>
      <Label size="big" color="tertiary">This is a Label</Label>
      <Label size="bold" color="tertiary">This is a Label</Label>
      <Label size="small" color="tertiary">This is a Label</Label>
      <Label color="tertiary">This is a Label</Label>

    </Container>
  );
};


export default Footer;
