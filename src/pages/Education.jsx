import styled from "styled-components";
import { Title } from "../ui/Heading";
import { educations } from "../data/constants";
import { Element } from "react-scroll";

const Container = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Boxcontainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  @media (max-width: 660px) {
    flex-direction: column;
  }
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Box = styled.div`
  background-color: #fff;
  padding: 40px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 30px 40px -15px #e5edf6;
  justify-content: space-between;
`;
const Icon = styled.div`
  font-size: 2em;
  color: #ffd93e;
`;

const School = styled.div`
  letter-spacing: -0.5px;
  color: #2e353e;
  margin-bottom: 5px;
  font-size: 1em;
  font-weight: 600;
`;

const Degree = styled.div`
  letter-spacing: -0.5px;
  color: #2e353e;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 1.4em;
`;

const Date = styled.div`
  letter-spacing: -0.5px;
  color: #ffd93e;
  font-weight: 700;
  font-size: 14px;
`;

const Grade = styled.div`
  letter-spacing: -0.5px;
  color: #2e353e;
  font-weight: 700;
  font-size: 14px;
`;

const Group = styled.div`
  display: flex;
  justify-content: space-between;
  height: 30px;
  align-items: flex-end;
`;
const StyledElement = styled(Element)`
  display: flex;
  width: 100%;
`;

export default function Education() {
  return (
    <StyledElement name="education">
      <Container>
        <Title>Education</Title>
        <Boxcontainer>
          {educations.map((education) => (
            <Box>
              <Icon>
                <education.icon />
              </Icon>
              <Degree>{education.degree}</Degree>
              <School>{education.school}</School>
              {/* <Group>
                <Date>{education.date}</Date>
                <Grade>{education.grade}</Grade>
              </Group> */}
            </Box>
          ))}
        </Boxcontainer>
      </Container>
    </StyledElement>
  );
}
