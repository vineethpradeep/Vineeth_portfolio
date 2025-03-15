import styled from "styled-components";
import { Title } from "../ui/Heading";
import ToggleParagraph from "../ui/ToggleParagraph";
import { Element } from "react-scroll";

const Wrapper = styled.section`
  margin: 0;
  padding: 0;
  width: 100%;
  text-align: justify;
`;

const StyledElement = styled(Element)`
  display: flex;
  width: 100%;
`;

export default function About() {
  return (
    <StyledElement name="about">
      <Wrapper>
        <Title>About Me</Title>
        <ToggleParagraph>
          I am a freelance product designer and full-stack developer
          specializing in cutting-edge web and mobile applications. With
          expertise in business product structure, UX/UI design, and
          development, I transform ideas into powerful digital solutions.
          <br />
          <br />
          Leveraging modern technologies like generative AI, cloud computing,
          and responsive frameworks, I create high-performance applications that
          run seamlessly across desktop and mobile platforms. My deep
          understanding of front-end and UI development spans over a decade,
          starting with frontend engineering and evolving into full-stack
          development, enabling me to build scalable, user-centric applications.
          <br />
          <br />
          My technical expertise includes mocking contexts in different screen
          standards, such as standard writing mode, screen reader mode, and view
          mode. I excel in handling viewport suits for layout design and custom
          viewports, ensuring optimal rendering and visual representation. I
          possess in-depth knowledge of the DOM and CSSOM, including parsing and
          painting concepts. Additionally, I am proficient in integrating
          third-party module parsing libraries and frameworks to enhance
          functionality and performance.
          <br />
          <br />
          Beyond technical proficiency, I have honed my visual design skills to
          craft aesthetically engaging and functionally seamless interfaces.
          Passionate about innovation, I stay ahead of emerging technologies and
          industry best practices, ensuring every project exceeds expectations.
          Whether working independently or collaboratively, I bring meticulous
          attention to detail, adaptability, and a commitment to quality. If
          you’re looking for a skilled web and mobile app designer and
          developer, let’s discuss how I can contribute to your next project.
        </ToggleParagraph>
      </Wrapper>
    </StyledElement>
  );
}
