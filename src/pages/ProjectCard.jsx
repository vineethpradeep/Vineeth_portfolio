import styled, { keyframes } from "styled-components";
import ModalWindow from "../ui/ModalWindow";
import ProjectDetails from "./ProjectDetails";

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.6; }
  100% { transform: scale(1); opacity: 1; }
`;

const Card = styled.div`
  position: relative;
  width: 330px;
  height: 430px;
  background-color: #fff;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  padding: 26px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: all 0.5s ease-in-out;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 0 50px 4px rgba(0, 0, 0, 0.6);
    filter: brightness(1.1);
  }
`;

const Image = styled.img`
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 16px 2px rgba(0, 0, 0, 0.3);
`;

const LiveBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: #e63946;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 6px;

  &::before {
    content: "";
    width: 8px;
    height: 8px;
    background: #fff;
    border-radius: 50%;
    animation: ${pulse} 1.2s infinite ease-in-out;
  }
`;

const Tags = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
`;

const Tag = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: #fff;
  background-color: #62605c;
  padding: 2px 8px;
  border-radius: 10px;
`;

const Details = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0px;
  padding: 0px 2px;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #000000;
  overflow: hidden;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Description = styled.div`
  font-weight: 400;
  color: #000000;
  overflow: hidden;
  margin-top: 8px;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;
const ProjectCards = ({ selectedProjects }) => {
  return (
    <>
      {selectedProjects.map((project) => (
        <ModalWindow>
          <ModalWindow.Open opens="viewProfile" project={project}>
            <Card key={project.projectId}>
              {project.live && <LiveBadge>LIVE</LiveBadge>}
              <Image src={project.image} />
              <Tags>
                {project.tags?.map((tag, index) => (
                  <Tag key={index}>{tag}</Tag>
                ))}
              </Tags>
              <Details>
                <Title>{project.title}</Title>
                <Description>{project.description}</Description>
              </Details>
            </Card>
          </ModalWindow.Open>
          <ModalWindow.Window name="viewProfile">
            <ProjectDetails key={project.projectId} />
          </ModalWindow.Window>
        </ModalWindow>
      ))}
    </>
  );
};

export default ProjectCards;
