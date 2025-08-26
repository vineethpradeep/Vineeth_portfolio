import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled, { keyframes } from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.6; }
  100% { transform: scale(1); opacity: 1; }
`;

const LiveBadge = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
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

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #18212f;
  border-radius: 9px;
  box-shadow: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
  @media (max-width: 660px) {
    padding: 13px;
    width: 90%;
  }
  @media (max-width: 768px) {
    width: 90%;
    border-bottom: 1px solid #e2e2e2;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: 5px;
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: #f3f4f6;
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: #9ca3af;
  }
`;

const ModalContext = createContext();

function ModalWindow({ children }) {
  const [openName, setOpenName] = useState("");
  const [selectedProject, setSelectedproject] = useState(null);

  const close = () => setOpenName("");
  const open = setOpenName;
  return (
    <ModalContext.Provider
      value={{
        openName,
        close,
        open,
        selectedProject,
        setSelectedproject,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName, project }) {
  const { open, setSelectedproject } = useContext(ModalContext);
  return cloneElement(children, {
    onClick: () => {
      setSelectedproject(project);
      open(opensWindowName);
    },
  });
}

function Window({ children, name }) {
  const { openName, close, selectedProject } = useContext(ModalContext);
  const ref = useOutsideClick(close);
  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        {selectedProject?.live && <LiveBadge>LIVE</LiveBadge>}
        {cloneElement(children, { selectedProject })}
      </StyledModal>
    </Overlay>,
    document.body
  );
}

ModalWindow.Open = Open;
ModalWindow.Window = Window;

export default ModalWindow;
