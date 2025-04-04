import styled from "styled-components";
import { Title } from "../ui/Heading";
import ToggleParagraph from "../ui/ToggleParagraph";
import { Element } from "react-scroll";

const Wrapper = styled.section`
  margin: 0;
  padding: 0;
  width: 100%;
  text-align: justify;
`;

const StyledElement = styled(Element)`
  display: flex;
  width: 100%;
`;

export default function About() {
  return (
    <StyledElement name="about">
      <Wrapper>
        <Title>About Me</Title>
        <ToggleParagraph>
          I’m a passionate and experienced Product Designer and Full-Stack
          Developer with over a decade of expertise in building scalable, high
          performance digital products. My career includes both freelance work
          and experience with various platform companies, allowing me to deliver
          end-to-end solutions that combine intuitive user experiences with
          robust, future ready architecture. This diverse background has honed
          my ability to meet business needs while setting new standards for
          quality.
          <br />
          <br />
          Leveraging modern technologies like generative AI, cloud computing,
          and responsive frameworks, I create high-performance applications that
          run seamlessly across desktop and mobile platforms. My deep
          understanding of front-end and UI development spans over a decade,
          starting with frontend engineering and evolving into full-stack
          development, enabling me to build scalable, user-centric applications.
          <br />
          <br />
          My technical expertise includes mocking contexts in different screen
          standards, such as layout flow writing mode, screen reader, and view.
          I excel in handling viewport suits for layout design and custom
          viewports, ensuring optimal rendering and visual representation. I
          possess in-depth knowledge parsing, scripting, rendering concepts for
          different screen engines, and painting. Additionally, I am proficient
          in integrating third-party module parsing libraries and frameworks to
          enhance functionality and performance.
          <br />
          <br />
          I specialise in designing and developing web and mobile applications
          using technologies like React.js, Next.js, Angular, Node.js, and
          Python. I focus on creating seamless API integrations, realtime
          interfaces, and component driven architectures that scale with
          business needs. From responsive web apps to native mobile solutions, I
          ensure each product is high performing and user friendly. My expertise
          extends to cloud native solutions and SaaS architecture. I help
          businesses build subscription based applications that are scalable and
          reliable. Using Docker, Kubernetes, and CI/CD pipelines, I
          containerise and deploy services in the cloud, ensuring fault tolerant
          and scalable environments. I have experience architecting multi tenant
          systems and orchestrating micro services for flexible, high
          performance deployments. I excel at bridging design thinking with
          technical execution, building responsive, accessible UIs that adapt to
          various devices. I integrate and customise CMS platforms like
          WordPress, Drupal, and headless CMS to support complex workflows in
          marketing, sales, and customer engagement. My architectural approach
          optimises performance, focusing on low latency communication between
          frontend and backend services.
          <br />
          <br />
          Beyond technical proficiency, I have honed my visual design skills to
          craft aesthetically engaging and functionally seamless interfaces.
          Passionate about innovation, I stay ahead of emerging technologies and
          industry best practices, ensuring every project exceeds expectations.
          Whether working independently or collaboratively, I bring meticulous
          attention to detail, adaptability, and a commitment to quality. If
          you’re looking for a skilled web and mobile app designer and
          developer, let’s discuss how I can contribute to your next project.
        </ToggleParagraph>
      </Wrapper>
    </StyledElement>
  );
}
