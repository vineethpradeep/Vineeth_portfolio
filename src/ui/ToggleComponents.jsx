import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
`;

const InitialContent = styled.div`
  padding: 10px;
  background-color: #e9ecef;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Content = styled.div`
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
  max-height: ${(props) =>
    props.expanded
      ? "1000px"
      : "100px"}; /* Adjust the max-height based on your content */
`;

const ExpandButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const MoreContent = styled.div`
  padding: 10px;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 10px;
`;

const ToggleComponents = () => {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef(null);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = expanded
        ? `${contentRef.current.scrollHeight}px`
        : "0px";
    }
  }, [expanded]);

  return (
    <Container>
      <InitialContent>
        <p>This is the initial content that is always visible.</p>
      </InitialContent>
      <Content ref={contentRef} expanded={expanded}>
        <MoreContent>
          <p>This is the additional content that you can show or hide.</p>
          <p>
            It will be smoothly expanded and collapsed when you click the
            button.
          </p>
          <p>Here is some more content to make the box bigger.</p>
        </MoreContent>
      </Content>
      <ExpandButton onClick={toggleExpand}>
        {expanded ? "Show Less" : "Show More"}
      </ExpandButton>
    </Container>
  );
};

export default ToggleComponents;
