import styled from "styled-components";
import TimelineComponent from "../ui/TimelineComponent";
import { Title } from "../ui/Heading";
import { experiences } from "../data/constants";
import { Element } from "react-scroll";
import { Desc } from "./Skills";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  & h1 {
    padding-bottom: 20px;
  }
`;

const StyledElement = styled(Element)`
  display: flex;
  width: 100%;
`;

export default function Experience() {
  return (
    <StyledElement name="experience">
      <Container>
        <Title>Experience</Title>
        <Desc>
          While employed as a UI Developer, I have had the opportunity to work
          with a variety of clients and projects.
        </Desc>
        <TimelineComponent experiences={experiences} />
      </Container>
    </StyledElement>
  );
}
