import { GlobalStyles } from "./styles/GlobalStyles";
import Header from "./pages/Header";
import QuickLink from "./pages/QuickLink";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Education from "./pages/Education";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contacts from "./pages/Contacts";
import WrapperComponents from "./ui/WrapperComponents";
import Footer from "./pages/Footer";
import ScrollToTopButton from "./ui/ScrollToTopButton";
import Navbar from "./pages/Navbar";
import withScrollAnimation from "./pages/withScrollAnimation";

const AboutWithAnimation = withScrollAnimation(About);
const SkillsWithAnimation = withScrollAnimation(Skills);
const ExperienceWithAnimation = withScrollAnimation(Experience);
const ProjectsWithAnimation = withScrollAnimation(Projects);
const EducationWithAnimation = withScrollAnimation(Education);
const ContactsWithAnimation = withScrollAnimation(Contacts);

function App() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <Header />
      <WrapperComponents>
        <QuickLink />
      </WrapperComponents>
      <WrapperComponents id="about">
        <AboutWithAnimation />
      </WrapperComponents>
      <WrapperComponents id="skills">
        <SkillsWithAnimation />
      </WrapperComponents>
      <WrapperComponents id="experience">
        <ExperienceWithAnimation />
      </WrapperComponents>
      <WrapperComponents id="projects">
        <ProjectsWithAnimation />
      </WrapperComponents>
      <WrapperComponents id="education">
        <EducationWithAnimation />
      </WrapperComponents>
      <WrapperComponents id="contacts">
        <ContactsWithAnimation />
      </WrapperComponents>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}

export default App;
