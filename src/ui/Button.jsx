import styled from "styled-components";

const ReadmoreButton = styled.span`
  color: #ffffff;
  background-color: #403f3d;
  border-color: #403f3d #403f3d #262524;
  border-radius: 35px;
  padding: 5px 18px;
  transition: all 0.1s;
  font-size: 1rem;
  cursor: pointer;
`;
export default function Button({ children, onClick }) {
  return <ReadmoreButton onClick={onClick}>{children}</ReadmoreButton>;
}
