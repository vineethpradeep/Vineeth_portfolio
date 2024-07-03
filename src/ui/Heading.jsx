import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 42px;
      font-weight: 600;
      margin-bottom: 20px;
      color: rgb(44, 44, 44);
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      color: #2e353e;
      font-weight: 600;
      font-size: 1.4em;
    `}
  line-height: 1.4;
`;

export const Title = styled.div`
  font-size: 42px;
  font-weight: 600;
  margin-bottom: 20px;
  color: rgb(44, 44, 44);
`;

export default Heading;
