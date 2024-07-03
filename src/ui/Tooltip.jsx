import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(12px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

const TooltipText = styled.div`
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  width: 120px;
  background-color: white;
  color: #000;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  left: 100%;
  top: 30%;
  margin-left: 10px;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: visibility 0s, opacity 0.5s ease-in-out;

  ${(props) =>
    props.visible &&
    css`
      animation: ${slideIn} 0.5s ease-in-out;
    `};

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 100%;
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent white transparent transparent;
  }
  @media (max-width: 660px) {
    display: none;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const Tooltip = ({ children, text }) => {
  const [visible, setVisible] = useState(false);

  return (
    <TooltipContainer
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      <TooltipText visible={visible}>{text}</TooltipText>
    </TooltipContainer>
  );
};

export default Tooltip;
