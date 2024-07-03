import styled from "styled-components";

const LinkedList = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 20px;
`;
const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const Icon = styled.div`
  border: 1px solid #454441;
  padding: 10px;
  color: #fff;
  font-size: 1.4em;
`;

const TitleLink = styled.div`
  font-size: 3rem;
  line-height: 1;
  font-size: 0.8em;
  color: #bdbdbd;
`;

const ContactLink = styled.span`
  font-size: 1.4em;
  color: #fff;
  @media (max-width: 660px) {
    font-size: 1em;
  }
  @media (max-width: 768px) {
    font-size: 1em;
  }
`;

const SocialName = styled.div`
  display: flex;

  span:nth-of-type(2) {
    border-right: 1px solid #52504d;
    border-left: 1px solid #52504d;
    padding: 0px 16px;
    margin: 0 13px;
  }
`;

export default function ContactComponents({ info }) {
  const names = Array.isArray(info.name) ? info.name : [info.name];

  return (
    <LinkedList>
      <Icon>
        <info.icon />
      </Icon>
      <List>
        <TitleLink>{info.title}</TitleLink>
        {names.length >= 3 ? (
          <SocialName>
            {names.map((nameItem, index) => (
              <ContactLink key={index}>
                {nameItem.mediaName || nameItem}
              </ContactLink>
            ))}
          </SocialName>
        ) : (
          <ContactLink>{names[0].mediaName || names[0]}</ContactLink>
        )}
      </List>
    </LinkedList>
  );
}
