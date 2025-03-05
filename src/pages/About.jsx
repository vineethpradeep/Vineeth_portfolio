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
          run seamlessly across desktop and mobile platforms. With over a decade
          of experience in front-end and UI development, my journey began in
          frontend engineering and evolved into full-stack development, allowing
          me to build scalable, user-centric applications. <br />
          <br />
          Beyond technical expertise, I have honed my visual design skills to
          craft aesthetically engaging and functionally seamless interfaces.
          Passionate about innovation, I stay ahead of emerging technologies and
          industry best practices, ensuring every project exceeds expectations.{" "}
          <br />
          <br />
          Whether working independently or collaboratively, I bring meticulous
          attention to detail, adaptability, and a commitment to quality. If
          you’re looking for a skilled web and mobile app designer and
          developer, let’s discuss how I can contribute to your next project.
        </ToggleParagraph>
      </Wrapper>
    </StyledElement>
  );
}
