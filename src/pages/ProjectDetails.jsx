import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  overflow-y: scroll;
  transition: all 0.5s ease;
`;

const Wrapper = styled.div`
  max-width: 800px;
  width: 100%;
  border-radius: 16px;
  margin: 20px 12px;
  height: min-content;
  background-color: #fff;
  color: #000;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: #000;
  margin: 8px 6px 0px 6px;
  @media only screen and (max-width: 600px) {
    font-size: 24px;
    margin: 6px 6px 0px 6px;
  }
`;

const Date = styled.div`
  font-size: 16px;
  margin: 2px 6px;
  font-weight: 400;
  color: #000;
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const Desc = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #000;
  margin: 8px 6px;
  max-height: 180px;
  overflow-y: auto;
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
`;

const Label = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #000;
  margin: 8px 6px;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 8px 0px;
`;

const Tag = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #000;
  margin: 4px;
  padding: 4px 8px;
  border-radius: 8px;
  border: 1px solid #b2b2b2;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 12px 0px;
  gap: 12px;
`;

const Button = styled.a`
  width: 100%;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: #000;
  padding: 12px 16px;
  border-radius: 8px;
  background-color: ${(props) => (props.secondary ? "#fff" : "#fbd44c")};
  cursor: pointer;
  text-decoration: none;
  transition: all 0.5s ease;
  border: 1px solid ${(props) => (props.secondary ? "#d3cece" : "#fbd44c")};
  &:hover {
    background-color: ${(props) => (props.secondary ? "#ededed" : "#ffc700")};
  }
`;

const ProjectDetails = ({ selectedProject }) => {
  console.log("project details");
  return (
    <Container>
      <Wrapper>
        <Image src={selectedProject?.image} />
        <Title>{selectedProject?.title}</Title>
        <Tags>
          {selectedProject?.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Tags>
        <Desc>{selectedProject?.description}</Desc>
        <ButtonGroup>
          <Button secondary={true} href={selectedProject.github} target="new">
            View Code
          </Button>
          <Button target="new" href={selectedProject.webapp}>
            View Live App
          </Button>
        </ButtonGroup>
      </Wrapper>
    </Container>
  );
};

export default ProjectDetails;
