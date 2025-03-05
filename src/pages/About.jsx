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
          specializing in cutting-edge technology and the development of full
          web and mobile applications. With expertise in business product
          structure, user experience (UX), user interface (UI) design, and
          development, I transform ideas into powerful digital solutions. I
          leverage modern technologies, including generative AI, cloud
          computing, and responsive frameworks, to build innovative,
          high-performance applications that seamlessly run on both desktop and
          mobile platforms. With over a decade of experience in web front-end
          and UI development, I bring a passion for design and technology to
          every project. My journey in the IT industry began with frontend
          development, gradually expanding to full-stack development, allowing
          me to create applications that are not only visually stunning but also
          highly responsive, scalable, and user-centric. Beyond my technical
          expertise, I have dedicated years to refining my visual design skills,
          ensuring that the interfaces I build are both aesthetically engaging
          and functionally seamless. I thrive on continuous learning and
          innovation, always staying ahead of emerging technologies and industry
          best practices. My problem-solving mindset and dedication to
          excellence allow me to develop creative solutions that exceed client
          expectations. Whether working independently or as part of a team, my
          enthusiasm, meticulous attention to detail, and commitment to quality
          ensure outstanding results. I am a highly motivated and adaptable
          professional who embraces new challenges and opportunities. My
          optimistic outlook and growth-oriented mindset enable me to make a
          meaningful impact on every project I take on. If you’re looking for a
          skilled full web and mobile app designer and developer, I’d love to
          discuss how I can contribute to your next project.
        </ToggleParagraph>
      </Wrapper>
    </StyledElement>
  );
}
