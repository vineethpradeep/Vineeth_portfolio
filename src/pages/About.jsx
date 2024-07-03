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
          I am a motivated and versatile individual, always eager to take on new
          challenges. With a passion for learning I am dedicated to delivering
          high-quality results. With a positive attitude and a growth mindset, I
          am ready to make a meaningful contribution and achieve great things.
          My enthusiasm and knowledge are assets to each project I work on,
          thanks to my more than a decade of experience in user interface and
          online front-end development. Since my early days learning JavaScript,
          HTML, and CSS, my expertise in the IT business has grown to include
          more complex frameworks like React, Redux, and Angular. Because of my
          varied skill set, I am able to create web apps that are responsive,
          aesthetically pleasing, and very powerful, all while giving users an
          excellent experience. I have also spent time perfecting my visual
          design abilities, which complement my technical proficiency. With my
          education and experience in design under my belt, I am well-equipped
          to create interfaces that are both useful and visually appealing. The
          need to always challenge myself is what drives my enthusiasm for
          front-end development. To keep my work fresh while still meeting or
          exceeding expectations, I make it a point to research and read up on
          current trends and best practices in my field. My work is
          characterised by a strong emphasis on creativity. I take immense pride
          in always exceeding customer expectations with my high-quality work
          and in my ability to solve difficult challenges in novel ways. All of
          my projects, whether I'm working alone or with a team, benefit from my
          passion, commitment, and attention to detail. I am an experienced
          front-end developer with a solid foundation in design, a dedication to
          quality, a love of creativity, and a desire to meet with you to
          discuss how I may be a part of your next project.
        </ToggleParagraph>
      </Wrapper>
    </StyledElement>
  );
}
