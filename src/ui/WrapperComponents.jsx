import styled, { css } from "styled-components";

const StyledComponent = styled.div`
  ${(props) =>
    props.styletype === "primary" &&
    css`
      background-color: #ffffff;
      padding: 60px 0px;
    `}
  ${(props) =>
    props.styletype === "secondary" &&
    css`
      background-color: #ecf1f7;
      border-color: #dae4ef;
      padding: 60px 0px;
    `}
  ${(props) =>
    props.styletype === "default" &&
    css`
      background-color: white;
    `}
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  @media (max-width: 660px) {
    width: 90%;
  }
  @media (max-width: 768px) {
    width: 90%;
  }
`;

function WrapperComponents({ children, id }) {
  function basedOnId(id) {
    const primaryComponents = ["about", "experience", "education"];
    const secondaryComponents = ["skills", "projects"];

    if (primaryComponents.includes(id)) {
      return "primary";
    } else if (secondaryComponents.includes(id)) {
      return "secondary";
    } else {
      return "default";
    }
  }
  const styletype = basedOnId(id);
  if (id === "contacts") {
    return <Container>{children}</Container>;
  }
  return (
    <StyledComponent styletype={styletype}>
      <Container>
        <Wrapper>{children}</Wrapper>
      </Container>
    </StyledComponent>
  );
}

export default WrapperComponents;
