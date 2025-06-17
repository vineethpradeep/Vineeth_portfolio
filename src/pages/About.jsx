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
          I am a passionate and experienced Product Designer and Full-Stack
          Developer with over a decade of expertise in building scalable,
          high-performance digital products. My career spans freelance projects
          and platform companies, allowing me to deliver end-to-end solutions
          that blend intuitive user experiences with robust, future-ready
          architecture. This diverse background has honed my ability to meet
          complex business needs while driving innovation and setting new
          quality standards.
          <br />
          <br />
          Leveraging modern technologies such as generative AI, cloud computing,
          and responsive frameworks, I create high-performance applications
          optimized for seamless operation across desktop and mobile platforms.
          My expertise in front-end and UI development has evolved over the past
          decade into full-stack mastery, enabling me to build scalable,
          user-centric applications.
          <br />
          <br />
          Technically, I specialize in Python and Django for backend development
          and PHP with Laravel for web application frameworks. My skills include
          mocking contexts for various screen standards, ensuring optimal
          rendering and accessibility across devices. I am proficient in
          parsing, scripting, rendering, and integrating third-party libraries
          to enhance application performance and functionality.
          <br />
          <br />
          I design and develop web and mobile applications using React.js,
          Next.js, Angular, Node.js, Python/Django, and PHP/Laravel. My focus is
          on seamless API integrations, real-time interfaces, and
          component-driven architectures that scale with evolving business
          needs. From responsive web apps to native mobile solutions, I
          prioritize high performance and user-friendly experiences.
          <br />
          <br />
          My expertise also extends to cloud-native SaaS architecture, where I
          build scalable subscription-based applications using Docker,
          Kubernetes, and CI/CD pipelines to deploy fault-tolerant services. I
          have experience architecting multi-tenant systems and orchestrating
          microservices for flexible, high-performance deployments. Beyond
          <br />
          <br />I bridge design thinking with technical execution to create
          responsive, accessible UIs adaptable to diverse devices. I integrate
          and customize CMS platforms such as WordPress, Drupal, and headless
          CMS solutions to support complex workflows across marketing, sales,
          and customer engagement. My architectural approach emphasizes
          performance optimization and low-latency communication between
          frontend and backend services.
          <br />
          <br />
          Beyond technical expertise, I have honed my visual design skills to
          craft aesthetically compelling and functionally seamless interfaces.
          Passionate about innovation, I continuously stay updated on emerging
          technologies and industry best practices to ensure that every project
          exceeds expectations. Whether working independently or
          collaboratively, I bring meticulous attention to detail, adaptability,
          and a strong commitment to quality.
          <br />
          <br />
          <em>
            If you’re looking for a skilled web and mobile app designer and
            developer, let’s connect—I’d love to discuss how I can contribute to
            your next project.
          </em>
        </ToggleParagraph>
      </Wrapper>
    </StyledElement>
  );
}
