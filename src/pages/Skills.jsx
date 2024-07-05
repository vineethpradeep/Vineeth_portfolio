import styled from "styled-components";
import { skills } from "../data/constants";
import { Title } from "../ui/Heading";
import { Element } from "react-scroll";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

export const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 800px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const SkillsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  gap: 30px;
  justify-content: center;
`;

const Skill = styled.div`
  width: 100%;
  max-width: 500px;
  background: #fff;
  border: 0.1px solid #fff5f5;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  border-radius: 16px;
  padding: 18px 36px;
  @media (max-width: 768px) {
    max-width: 400px;
    padding: 10px 36px;
  }
  @media (max-width: 500px) {
    max-width: 330px;
    padding: 10px 36px;
  }
`;

const SkillTitle = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: #000000;
  margin-bottom: 20px;
  text-align: center;
`;

const SkillList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
`;

const SkillItem = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary + 80};
  border: 1px solid ${({ theme }) => theme.text_primary + 80};
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 12px;
  }
  @media (max-width: 500px) {
    font-size: 14px;
    padding: 6px 12px;
  }
`;

const SkillIcon = styled.span`
  font-size: 38px;
  display: flex;
  color: ${(props) => props.color};
`;

const Hr = styled.hr`
  background-image: -webkit-linear-gradient(
    left,
    transparent,
    #ffd93e,
    transparent
  );
  background-image: linear-gradient(
    to right,
    transparent,
    #ffd93e,
    transparent
  );
  border: 0;
  height: 1px;
  margin: 22px 0;
  width: 100%;
`;

const StyledElement = styled(Element)`
  display: flex;
  width: 100%;
`;

function Skills() {
  return (
    <StyledElement name="skills">
      <Container>
        <Wrapper>
          <Title>Skills</Title>
          <Desc>
            Here are some of the skills that I have refined over the past nine
            years.
          </Desc>
          <SkillsContainer>
            {skills.map((skill) => (
              <Skill>
                <SkillTitle key={skill.title}>{skill.title}</SkillTitle>
                <Hr />
                <SkillList>
                  {skill.skills.map((item) => (
                    <SkillItem key={skill.name}>
                      <SkillIcon color={item.color}>
                        {item.icon === "materialUi" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="32"
                            viewBox="0 0 36 32"
                            fill="none"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M30.343 21.976a1 1 0 00.502-.864l.018-5.787a1 1 0 01.502-.864l3.137-1.802a1 1 0 011.498.867v10.521a1 1 0 01-.502.867l-11.839 6.8a1 1 0 01-.994.001l-9.291-5.314a1 1 0 01-.504-.868v-5.305c0-.006.007-.01.013-.007.005.003.012 0 .012-.007v-.006c0-.004.002-.008.006-.01l7.652-4.396c.007-.004.004-.015-.004-.015a.008.008 0 01-.008-.008l.015-5.201a1 1 0 00-1.5-.87l-5.687 3.277a1 1 0 01-.998 0L6.666 9.7a1 1 0 00-1.499.866v9.4a1 1 0 01-1.496.869l-3.166-1.81a1 1 0 01-.504-.87l.028-16.43A1 1 0 011.527.86l10.845 6.229a1 1 0 00.996 0L24.21.86a1 1 0 011.498.868v16.434a1 1 0 01-.501.867l-5.678 3.27a1 1 0 00.004 1.735l3.132 1.783a1 1 0 00.993-.002l6.685-3.839zM31 7.234a1 1 0 001.514.857l3-1.8A1 1 0 0036 5.434V1.766A1 1 0 0034.486.91l-3 1.8a1 1 0 00-.486.857v3.668z"
                              fill="#007FFF"
                            ></path>
                          </svg>
                        ) : (
                          <item.icon />
                        )}
                      </SkillIcon>
                      {item.name}
                    </SkillItem>
                  ))}
                </SkillList>
              </Skill>
            ))}
          </SkillsContainer>
        </Wrapper>
      </Container>
    </StyledElement>
  );
}

export default Skills;
