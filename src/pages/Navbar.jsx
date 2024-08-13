import { Link } from "react-scroll";
import styled from "styled-components";
import {
  HiOutlineBriefcase,
  HiOutlineEye,
  HiOutlineHome,
} from "react-icons/hi2";
import { SlGraduation } from "react-icons/sl";
import { FaMedapps } from "react-icons/fa";
import { PiHeadCircuit } from "react-icons/pi";
import { LuLink } from "react-icons/lu";
import { useEffect, useState } from "react";
import Tooltip from "../ui/Tooltip";
import { HiOutlineMenuAlt4, HiOutlineX } from "react-icons/hi";

const Container = styled.div``;
const Nav = styled.nav`
  position: fixed;
  top: 8.2%;
  left: 10%;
  z-index: 99999;
  box-shadow: 0px 0px 80px 0px rgba(62, 62, 62, 0.3);
  @media (max-width: 660px) {
    position: absolute;
  }
  @media (max-width: 768px) {
    position: absolute;
  }
  li:first-child {
    a {
      background-color: #fff;
      @media (max-width: 660px) {
        background-color: #ffd93e;
      }
      @media (max-width: 768px) {
        background-color: #ffd93e;
      }
    }
  }
`;
const List = styled.li``;
const Icon = styled.div`
  font-size: 25px;
  position: relative;
  display: flex;
  cursor: pointer;
  height: 60px;
  width: 60px;
  justify-content: center;
  align-items: center;
  color: #191919;
`;

const NavLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffd93e;
  cursor: pointer;
  &.active {
    background-color: ${(props) => props.activeClass && "#fff"};
    @media (max-width: 660px) {
      background-color: ${(props) => props.activeClass && "#fff"};
    }
    @media (max-width: 768px) {
      background-color: ${(props) => props.activeClass && "#fff"};
    }
  }
  &:hover {
    background-color: ${(props) => props.activeClass && "#fff"};
  }
`;
export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(true);
  function handleNav() {
    setMobileMenu((menu) => !menu);
  }
  useEffect(function () {
    const contactYPos = window.screenY;
  }, []);
  return (
    <Container mobileMenu>
      <Nav>
        {/* <NavContainer>
          <div>
            <HiOutlineHome size={30} />
          </div>
          <MenuButton onClick={toggleMenu}>
            {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
          </MenuButton>
        </NavContainer>
        <NavList isOpen={menuOpen}></NavList> */}
        <ul>
          <List>
            <NavLink activeClass="active" onClick={handleNav}>
              <Tooltip text={mobileMenu ? "Close" : "Open"}>
                <Icon>
                  {mobileMenu ? <HiOutlineX /> : <HiOutlineMenuAlt4 />}
                </Icon>
              </Tooltip>
            </NavLink>
          </List>
          {mobileMenu && (
            <>
              <List>
                <NavLink
                  activeClass="active"
                  to="home"
                  spy={true}
                  smooth={true}
                  duration={500}
                >
                  <Tooltip text="About">
                    <Icon>
                      <HiOutlineEye />
                    </Icon>
                  </Tooltip>
                </NavLink>
              </List>
              <List>
                <NavLink
                  activeClass="active"
                  to="skills"
                  spy={true}
                  smooth={true}
                  duration={500}
                  offset={-60}
                >
                  <Tooltip text="Skills">
                    <Icon>
                      <PiHeadCircuit />
                    </Icon>
                  </Tooltip>
                </NavLink>
              </List>
              <List>
                <NavLink
                  activeClass="active"
                  to="experience"
                  spy={true}
                  smooth={true}
                  duration={500}
                  offset={-60}
                >
                  <Tooltip text="Experience">
                    <Icon>
                      <HiOutlineBriefcase />
                    </Icon>
                  </Tooltip>
                </NavLink>
              </List>
              <List>
                <NavLink
                  activeClass="active"
                  to="projects"
                  spy={true}
                  smooth={true}
                  duration={500}
                  offset={-60}
                >
                  <Tooltip text="Projects">
                    <Icon>
                      <FaMedapps />
                    </Icon>
                  </Tooltip>
                </NavLink>
              </List>
              <List>
                <NavLink
                  activeClass="active"
                  to="education"
                  spy={true}
                  smooth={true}
                  duration={500}
                  offset={-60}
                >
                  <Tooltip text="Education">
                    <Icon>
                      <SlGraduation />
                    </Icon>
                  </Tooltip>
                </NavLink>
              </List>
              <List>
                <NavLink
                  activeClass="active"
                  to="contacts"
                  spy={true}
                  smooth={true}
                  duration={500}
                  offset={-100}
                >
                  <Tooltip text="Contacts">
                    <Icon>
                      <LuLink />
                    </Icon>
                  </Tooltip>
                </NavLink>
              </List>
            </>
          )}
        </ul>
      </Nav>
    </Container>
  );
}
