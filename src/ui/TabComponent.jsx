import { useState } from "react";
import styled from "styled-components";
import ProjectCards from "../pages/ProjectCard";
import { projects } from "../data/constants";
import Pagination from "./Pagination";

const TabContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  margin-top: 20px;
`;
const TabButton = styled.button`
  background: ${(props) => (props.active ? "#ffd93e" : "transparent")};
  border-radius: 35px;
  color: #2e353e;
  text-transform: uppercase;
  border: 1px solid ${(props) => (props.active ? "#ffd93e" : "#d0d3d6")};
  font-weight: 600;
  padding: 7px 30px;
  font-size: 0.9em;
  transition: ease background 300ms;

  &:hover {
    background: #ffd93e;
    border-color: #ffd93e;
  }
`;
const TabbedContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ProjectCardContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
  margin-top: 30px;
  @media (max-width: 660px) {
    gap: 20px;
  }
  @media (max-width: 768px) {
    gap: 20px;
  }
`;

function TabComponent() {
  const [currentTab, setCurrentTab] = useState(projects[0].id);
  const [currentPage, setCurrentPage] = useState(1);

  function handleTabChange(id) {
    setCurrentTab(id);
    setCurrentPage(1);
  }
  console.log("tab");
  return (
    <>
      <TabContainer>
        {projects.map((item) => (
          <Tab
            id={item.id}
            activeTab={item.id === currentTab}
            onClick={() => handleTabChange(item.id)}
            tabName={item.projectItem}
          />
        ))}
      </TabContainer>
      <TabbedContainer>
        <TabContant
          projectsItem={projects.at(currentTab)}
          currentPage={currentPage}
          onCurrentPage={(page) => setCurrentPage(page)}
        />
      </TabbedContainer>
    </>
  );
}

function Tab({ id, activeTab, onClick, tabName }) {
  return (
    <TabButton active={activeTab} onClick={() => onClick(id)}>
      {tabName}
    </TabButton>
  );
}

function TabContant({ projectsItem, onCurrentPage, currentPage }) {
  const { projects } = projectsItem;
  console.log(projectsItem);
  const itemsPerPage = 3;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedProjects = projects.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(projects.length / itemsPerPage);

  const handlePageChange = (page) => {
    onCurrentPage(page);
  };
  return (
    <>
      <ProjectCardContainer>
        <ProjectCards selectedProjects={selectedProjects} />
      </ProjectCardContainer>
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}

export default TabComponent;
