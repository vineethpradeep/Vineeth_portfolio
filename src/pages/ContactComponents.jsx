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
  font-size: 0.8em;
  line-height: 1;
  color: #bdbdbd;
`;

const ContactLink = styled.a`
  font-size: 1.4em;
  color: #fff;
  cursor: pointer;
  @media (max-width: 768px) {
    font-size: 1em;
  }
`;

const SocialName = styled.div`
  display: flex;
  a {
    padding: 0px 10px;
    border-right: 1px solid #52504d;
  }
  a:first-child {
    padding-left: 0;
  }
  a:last-child {
    border-right: 0;
  }
`;

export default function ContactComponents({ info }) {
  const IconComponent = info.icon;
  const names = Array.isArray(info.name) ? info.name : [info.name];

  return (
    <LinkedList>
      <Icon>
        <IconComponent />
      </Icon>
      <List>
        <TitleLink>{info.title}</TitleLink>
        {Array.isArray(info.name) ? (
          <SocialName>
            {names.map((nameItem, index) => (
              <ContactLink
                href={nameItem.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
              >
                {nameItem.mediaName || nameItem}
              </ContactLink>
            ))}
          </SocialName>
        ) : (
          <ContactLink
            href={info.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            {names[0].mediaName || names[0]}
          </ContactLink>
        )}
      </List>
    </LinkedList>
  );
}
