import styled from "styled-components";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const Scrollbtn = styled.div`
  padding: 16px 16px 14px;
  color: #fff;
  background-color: #6b6c6e;
  position: fixed;
  bottom: 0;
  right: 10px;
  min-width: 49px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showButton && (
        <Scrollbtn onClick={scrollToTop}>
          <FaArrowUp />
        </Scrollbtn>
      )}
    </>
  );
};

export default ScrollToTopButton;
