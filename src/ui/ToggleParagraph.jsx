import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Button from "./Button";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Text = styled.div`
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
  max-height: ${(props) => (props.expanded ? "1000px" : "50px")};
  margin-bottom: 10px;
`;

const ToggleParagraph = ({ children }) => {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef(null);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = expanded
        ? `${contentRef.current.scrollHeight}px`
        : "50px";
    }
  }, [expanded]);

  return (
    <Container>
      <Text ref={contentRef} expanded={expanded}>
        <p>{children}</p>
      </Text>
      <Button onClick={toggleExpand}>
        {expanded ? "Show Less" : "Show More"}
      </Button>
    </Container>
  );
};

export default ToggleParagraph;
