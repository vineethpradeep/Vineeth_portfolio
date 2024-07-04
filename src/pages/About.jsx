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
          I am a highly-motivated and adaptable person who is always looking for
          new challenges. Thanks to my insatiable need for knowledge, I am
          committed to providing excellent service. Being optimistic and having
          a development mentality have prepared me to make a significant impact
          and accomplish remarkable things. With over a decade of expertise in
          web front-end and user interface development, my passion and expertise
          are valuable additions to every project I take on. My experience in
          the IT industry has expanded from my early days of studying frontend
          technology. The breadth and depth of my skill set allow me to design
          and develop online applications that not only meet but exceed user
          expectations in terms of responsiveness, aesthetics, and power. Along
          with my technical expertise, I have dedicated a great deal of effort
          to honing my visual design skills. I am able to create interfaces that
          are both pleasing and functional. I am passionate about front-end
          programming because I need to constantly push myself. Researching and
          reading up on current trends and best practices in my sector allows me
          to keep my work fresh while still meeting or surpassing expectations.
          An focus on originality is inherent in my work. I am quite proud of my
          ability to consistently come up with innovative solutions to
          challenging problems and of the excellent quality of my work, both of
          which consistently surpass client expectations. Whether I'm part of a
          team or working alone, my enthusiasm, dedication, and meticulousness
          always provide excellent results. I am an accomplished front-end
          developer that is eager to meet with you to talk about the possibility
          of contributing to your next project.
        </ToggleParagraph>
      </Wrapper>
    </StyledElement>
  );
}
