import styled from "styled-components";

const FooterContainer = styled.div`
  color: #727c93;
  display: flex;
  justify-content: center;
  margin: 10px;
  font-size: 0.9em;
`;
export default function Footer() {
  return (
    <FooterContainer>
      {`© Copyright ${new Date().getFullYear()}. All Rights Reserved. It is my theme | Vineeth
      Pradeep Portfolio.`}
    </FooterContainer>
  );
}
