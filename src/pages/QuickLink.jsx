import styled from "styled-components";
import { BsCloudDownload } from "react-icons/bs";
import { PiHeadphones } from "react-icons/pi";
import { IoMailOutline } from "react-icons/io5";
import { Link } from "react-scroll";

const QLContainer = styled.div`
  display: flex;
  width: 100%;
  z-index: 3;
  justify-content: flex-end;
  margin-left: 160px;
  @media (max-width: 660px) {
    margin-left: 0;
  }
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  border-bottom: 1px solid #e2e2e2;
  @media (max-width: 768px) {
    display: block;
    border-bottom: 0px solid #e2e2e2;
  }
  @media (max-width: 660px) {
    display: block;
    width: 100%;
    border-bottom: 0px solid #e2e2e2;
  }
  div:first-of-type {
    border-right: 1px solid #e2e2e2;
    @media (max-width: 660px) {
      border-right: 0px solid #e2e2e2;
      border-bottom: 1px solid #e2e2e2;
      width: 100%;
    }
    @media (max-width: 768px) {
      width: 100%;
      border-right: 0px solid #e2e2e2;
    }
  }
  div:nth-of-type(2) {
    border-right: 1px solid #e2e2e2;
    @media (max-width: 660px) {
      border-right: 0px solid #e2e2e2;
      width: 100%;
    }
    @media (max-width: 768px) {
      border-right: 0px solid #e2e2e2;
      width: 100%;
    }
  }
  @media (max-width: 660px) {
    display: block;
    width: 100%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const QuickLinkBox = styled.div`
  font-size: 1.3em;
  letter-spacing: -0.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 300px;
  height: 82px;
  cursor: pointer;
  & svg {
    color: #ffd93e;
    font-size: 1.3em;
  }
`;

export default function QuickLink() {
  function navigateToFile(filepath) {
    window.open(filepath, "_blank", "noopener,noreferrer");
  }
  return (
    <QLContainer>
      <Wrapper>
        <Link
          activeClass="active"
          to="contacts"
          spy={true}
          smooth={true}
          duration={500}
          offset={-100}
        >
          <QuickLinkBox>
            <PiHeadphones />
            <p>Contact Information</p>
          </QuickLinkBox>
        </Link>
        <Link
          activeClass="active"
          to="contacts"
          spy={true}
          smooth={true}
          duration={500}
          offset={-100}
        >
          <QuickLinkBox>
            <IoMailOutline />
            <p>Send Message</p>
          </QuickLinkBox>
        </Link>
        <Link
          activeClass="active"
          to="contacts"
          spy={true}
          smooth={true}
          duration={500}
          offset={-100}
        >
          <QuickLinkBox
            onClick={() => navigateToFile("/vineeth_pradeep_cv.pdf")}
          >
            <p>
              <BsCloudDownload />
            </p>
            Download Resume
          </QuickLinkBox>
        </Link>
      </Wrapper>
    </QLContainer>
  );
}
