import styled from "styled-components";
import TabComponent from "../ui/TabComponent";
import { Title } from "../ui/Heading";
import { Element } from "react-scroll";
import { Desc } from "./Skills";

const ProjectContainer = styled.section`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  & h1 {
    padding-bottom: 20px;
  }
`;
const StyledElement = styled(Element)`
  display: flex;
  width: 100%;
`;
export default function Projects() {
  return (
    <StyledElement name="projects">
      <ProjectContainer>
        <Title>Projects</Title>
        <Desc>
          My experience includes a diverse array of projects. just like
          developing applications and user interfaces and user experiences. You
          may see a few examples of my work here.
        </Desc>
        <TabComponent />
      </ProjectContainer>
    </StyledElement>
  );
}
