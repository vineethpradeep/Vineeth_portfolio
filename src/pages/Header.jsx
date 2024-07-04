import TypewriterComponent from "typewriter-effect";
import styled, { css } from "styled-components";
import Button from "../ui/Button";
import { bio } from "../data/constants";
import { Element, Link } from "react-scroll";

const StyledHeader = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  background-image: url("contact-bg.jpg");
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  @media (max-width: 660px) {
    height: 850px;
  }
  @media (max-width: 768px) {
    height: 940px;
  }
`;

const HeaderContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  z-index: 1;
  display: flex;
  gap: 2rem;
  width: 65%;
  justify-content: center;
  padding-top: 150px;
  @media (max-width: 660px) {
    display: block;
    width: 100%;
  }
  @media (max-width: 768px) {
    display: block;
    width: 100%;
    padding-top: 70px;
  }
`;

const PortfolioImg = styled.img`
  box-shadow: 0px 12px 90px -10px rgba(139, 139, 139, 0.5);
  border: 10px solid #fff;
  width: 350px;
  height: 500px;
  position: relative;
  bottom: -5px;
  @media (max-width: 660px) {
    width: 300px;
    height: inherit;
  }
  @media (max-width: 768px) {
    width: 300px;
    height: inherit;
  }
`;

const lightFont = css`
  font-size: 14px;
  color: #b7b7b7;
  text-transform: uppercase;
`;

const AboutIntro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 1;
  @media (max-width: 660px) {
    align-items: flex-start;
    margin: 20px;
  }
  @media (max-width: 768px) {
    align-items: flex-start;
    margin: 20px;
  }
  p {
    ${lightFont}
  }
  strong {
    color: #ffffff;
    font-weight: 700;
  }

  hr {
    background-image: -webkit-linear-gradient(
      left,
      transparent,
      #dbdbdb,
      transparent
    );
    background-image: linear-gradient(
      to right,
      transparent,
      #dbdbdb,
      transparent
    );
    border: 0;
    height: 1px;
    margin: 22px 0;
    width: 50%;

    @media (max-width: 660px) {
      margin: auto;
    }
    @media (max-width: 768px) {
      margin: auto;
    }
  }
`;

const H1 = styled.h1`
  font-size: 60px;
  font-weight: 600;
  letter-spacing: -2px;
  color: #ffd93e;
  line-height: 1;
  @media (max-width: 660px) {
    font-size: 45px;
  }
  @media (max-width: 768px) {
    font-size: 45px;
  }
`;

const Splfont = styled.span`
  display: flex;
  gap: 10px;
  margin-bottom: 50px;
  font-size: 21px;
  letter-spacing: -0.5px;
  @media (max-width: 660px) {
    margin-bottom: 20px;
  }
  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;
const StyledElement = styled(Element)`
  display: flex;
  width: 100%;
`;

const Hi = styled.span`
  font-size: 4rem;
  font-weight: 600;
  opacity: 0.5;
`;

const LinkText = styled.span`
  padding-top: 15px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  @media (max-width: 660px) {
    display: inline-block;
    text-align: left;
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
  }
  @media (max-width: 768px) {
    display: inline-block;
    text-align: left;
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
  }
  a {
    @media (max-width: 660px) {
      margin-left: 10px;
    }
    @media (max-width: 768px) {
      margin-left: 10px;
    }
  }
`;

export default function Header() {
  return (
    <StyledHeader>
      <StyledElement name="home">
        <HeaderContent>
          <PortfolioImg src="me.jpg" alt="vineeth pradeep" />
          <AboutIntro>
            <Hi>Hi, I am</Hi>
            <H1>{bio.name}</H1>
            <Splfont>
              <span>I am a</span>
              <span>
                <TypewriterComponent
                  options={{
                    strings: bio.roles,
                    autoStart: true,
                    loop: true,
                  }}
                />
              </span>
            </Splfont>
            <p>Swansea, UK</p>
            <p>Information Technology and Service</p>
            <LinkText>
              <strong>Professional : </strong>Frontend Developer{" "}
              <Link
                activeClass="active"
                to="experience"
                spy={true}
                smooth={true}
                duration={500}
                offset={-60}
              >
                <Button>View more</Button>
              </Link>
            </LinkText>
            <hr />
            <LinkText>
              <strong>Education : </strong> MSc Electronics & Communication
              Systems
              <Link
                activeClass="active"
                to="education"
                spy={true}
                smooth={true}
                duration={500}
                offset={-60}
              >
                <Button>View more</Button>
              </Link>
            </LinkText>
          </AboutIntro>
        </HeaderContent>
      </StyledElement>
    </StyledHeader>
  );
}
