import styled from "styled-components";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaSuitcase, FaSchool } from "react-icons/fa";
import Button from "../ui/Button";
import { useState } from "react";
import ToggleParagraph from "./ToggleParagraph";

// Styled component for the VerticalTimeline
const CustomVerticalTimeline = styled(VerticalTimeline)`
  &::before,
  .vertical-timeline-element:after {
    background: var(--line-color);
  }
  &::after,
  .vertical-timeline-element:after {
    background: var(--line-color);
  }
`;

// Styled component for customizing the VerticalTimelineElement
const CustomTimelineElement = styled(VerticalTimelineElement)`
  .vertical-timeline-element-content {
    background: #ffffff;
    border: 2px solid #ffd93e;
    color: #2e353e;
    border-radius: 8px;
    box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  }

  .vertical-timeline-element-content-arrow {
    border-right: 7px solid #ffd93e;
  }

  .vertical-timeline-element-date {
    color: #2e353e;
  }

  .vertical-timeline-element-icon {
    background: #f9d544;
    color: #ffffff;
  }
  .vertical-timeline-element-subtitle {
    color: #878582;
    font-size: 1.6rem;
    font-weight: 500;
    margin-bottom: 10px;
  }
  .vertical-timeline-element-content p {
    margin: 0;
  }
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: disc;
  margin-left: 20px;
`;

const ListItem = styled.li`
  margin-bottom: 5px;
`;

const TimelineContent = styled.div`
  p {
    margin: 0;
    padding: 0;
  }
  ul {
    padding-left: 0;
    margin: 0;
  }
  li {
    margin-bottom: 10px;
  }
`;

const TimelineComponent = ({ experiences }) => {
  return (
    <VerticalTimeline>
      {experiences.map((experience) => (
        <CustomTimelineElement
          key={experience.id}
          className="vertical-timeline-element--work"
          date={experience.date}
          icon={<FaSuitcase />}
        >
          <h3 className="vertical-timeline-element-title">{experience.role}</h3>
          <h4 className="vertical-timeline-element-subtitle">
            {experience.company}
          </h4>
          <TimelineContent>
            <p>
              <ul>
                <ToggleParagraph>
                  {experience.desc.map((descItem, index) => (
                    <li key={index}>{descItem}</li>
                  ))}
                </ToggleParagraph>
              </ul>
            </p>
          </TimelineContent>
        </CustomTimelineElement>
      ))}
    </VerticalTimeline>
  );
};
export default TimelineComponent;
